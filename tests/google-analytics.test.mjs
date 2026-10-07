import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import * as analytics from '../src/lib/google-analytics.mjs';

test('only the production hostname with a valid measurement ID can collect', () => {
  for (const host of ['localhost', 'roboskin-preview.vercel.app', 'roboskin.ai.example.com']) {
    assert.equal(analytics.canUseGoogleAnalytics('G-TEST123', host), false);
  }
  assert.equal(analytics.canUseGoogleAnalytics('', 'roboskin.ai'), false);
  assert.equal(analytics.canUseGoogleAnalytics('G-TEST123', 'roboskin.ai'), true);
});

test('page and referrer URLs exclude queries, fragments, and external paths', () => {
  assert.equal(analytics.analyticsPageUrl('https://roboskin.ai/contact?email=test@example.com#message'), 'https://roboskin.ai/contact');
  assert.equal(analytics.analyticsReferrer('https://www.google.com/search?q=private'), 'https://www.google.com/');
  assert.equal(analytics.analyticsReferrer('https://roboskin.ai/datasets?q=private'), 'https://roboskin.ai/datasets');
  assert.equal(analytics.analyticsReferrer('javascript:alert(1)'), '');
});

test('navigation sends one view, correct previous page, and counts a return visit', () => {
  const events = [];
  const tracker = analytics.createPageViewTracker((...args) => events.push(args));
  const visit = (path) => tracker.track({ location: `https://roboskin.ai${path}`, title: 'Public title', referrer: 'https://www.google.com/search?q=test' });
  visit('/'); visit('/'); visit('/?email=test@example.com'); visit('/datasets'); visit('/');
  const views = events.filter(args => args[0] === 'event');
  assert.equal(views.length, 3);
  assert.deepEqual(views.map(args => args[2].page_referrer), ['https://www.google.com/', 'https://roboskin.ai/', 'https://roboskin.ai/datasets']);
  assert.ok(events.every(args => !JSON.stringify(args).includes('email')));
});

const compiled = ts.transpileModule(readFileSync('src/components/GoogleAnalytics.tsx', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;

function mount({ saved = null, hostname = 'roboskin.ai', id = 'G-TEST123', storageThrows = false, path = '/' } = {}) {
  const hooks = []; let index = 0; let effects = []; let tree; let dirty = true;
  const frames = new Map(); let frameId = 0;
  const listeners = new Map(); const exports = {};
  const window = { location: { hostname, href: `https://${hostname}${path}` }, addEventListener: (name, cb) => listeners.set(name, cb), removeEventListener: (name) => listeners.delete(name) };
  const documentListeners = new Map();
  const document = { referrer: 'https://www.google.com/search?q=private', title: 'RoboSkin.ai', cookie: '_ga=123; _ga_TEST123=456', addEventListener: (name, cb) => documentListeners.set(name, cb), removeEventListener: name => documentListeners.delete(name) };
  let stored = saved;
  runInNewContext(compiled, {
    exports, window, document, process: { env: { NEXT_PUBLIC_GA_MEASUREMENT_ID: id } },
    localStorage: { getItem: () => { if (storageThrows) throw Error('disabled'); return stored; }, setItem: (_key, value) => { if (storageThrows) throw Error('disabled'); stored = value; } },
    requestAnimationFrame: cb => { frames.set(++frameId, cb); return frameId; }, cancelAnimationFrame: id => frames.delete(id),
    require(name) {
      if (name === 'react/jsx-runtime') return { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }), Fragment: 'Fragment' };
      if (name === 'next/script') return { default: 'Script' };
      if (name === 'next/link') return { default: 'Link' };
      if (name === 'next/navigation') return { usePathname: () => new URL(window.location.href).pathname };
      if (name === '@/lib/google-analytics.mjs') return analytics;
      if (name === 'react') return {
        useRef(initial) { return hooks[index++] ??= { current: initial }; },
        useState(initial) { const i = index++; hooks[i] ??= { value: initial }; return [hooks[i].value, value => { if (hooks[i].value !== value) { hooks[i].value = value; dirty = true; } }]; },
        useEffect(cb, deps) { const i = index++; const prev = hooks[i]; if (!prev || deps.some((v, n) => v !== prev.deps[n])) { hooks[i] = { deps, cleanup: prev?.cleanup }; effects.push(() => { hooks[i].cleanup?.(); hooks[i].cleanup = cb(); }); } },
      };
      throw Error(`Unexpected import ${name}`);
    },
  });
  function nodes(node) { if (!node) return []; if (Array.isArray(node)) return node.flatMap(n => nodes(n)); return typeof node === 'object' ? [node, ...nodes(node.props?.children)] : []; }
  function render() { do { dirty = false; index = 0; effects = []; tree = exports.default(); effects.forEach(cb => cb()); } while (dirty); const pending = [...frames.values()]; frames.clear(); pending.forEach(cb => cb()); }
  return {
    window, document, render, nodes: () => nodes(tree),
    click(label) { nodes(tree).find(n => n.type === 'button' && n.props.children === label).props.onClick(); render(); },
    settings() { listeners.get('roboskin:analytics-settings')?.(); render(); },
    clickLink(href) { documentListeners.get('click')?.({ target: { closest: () => ({ href }) } }); },
    navigate(path) { window.location.href = `https://${hostname}${path}`; document.title = new URL(window.location.href).pathname; render(); },
    commands() { return Array.from(window.dataLayer ?? [], args => Array.from(args)); },
  };
}

test('no choice or declining never loads the Google tag or queues events', () => {
  const app = mount(); app.render();
  assert.equal(app.nodes().some(n => n.type === 'Script'), false);
  assert.equal(app.commands().length, 0);
  app.click('Decline'); app.navigate('/datasets');
  assert.equal(app.nodes().some(n => n.type === 'Script'), false);
  assert.equal(app.commands().length, 0);
});

test('only approved campaign combinations survive; private and duplicate values are discarded', () => {
  const campaign = analytics.resourceCampaign;
  for (const [source, medium] of [['x', 'social'], ['reddit', 'social'], ['github', 'referral'], ['newsletter', 'email']]) {
    const result = analytics.analyticsCampaign(`https://roboskin.ai/tactile-ai?utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}&utm_content=private@example.com&q=private`);
    assert.deepEqual(result, { campaign_source: source, campaign_medium: medium, campaign_name: campaign });
  }
  for (const query of [
    `utm_source=x&utm_medium=email&utm_campaign=${campaign}`,
    `utm_source=private@example.com&utm_medium=email&utm_campaign=${campaign}`,
    'utm_source=x&utm_medium=social&utm_campaign=private',
    `utm_source=x&utm_source=private&utm_medium=social&utm_campaign=${campaign}`,
    `utm_medium=social&utm_campaign=${campaign}`,
    '',
  ]) assert.deepEqual(analytics.analyticsCampaign(`https://roboskin.ai/?${query}`), {});
  assert.deepEqual(analytics.analyticsCampaign(`https://unrelated.example/?utm_source=x&utm_medium=social&utm_campaign=${campaign}`), {});
});

test('resource events exclude external links, arbitrary queries and self-navigation', () => {
  const origin = 'https://roboskin.ai/robot-skin?email=private@example.com';
  const click = analytics.analyticsResourceEvent(origin, '/resources/tactile-experiment-worksheet.csv?email=private@example.com');
  assert.deepEqual(click, { name: 'resource_download', parameters: { resource_id: 'experiment-worksheet', from_path: '/robot-skin', target_path: '/resources/tactile-experiment-worksheet.csv' } });
  assert.equal(analytics.analyticsResourceEvent(origin, '/tactile-ai#experiment-worksheet').parameters.resource_id, 'experiment-worksheet');
  for (const href of ['https://other.example/datasets', 'https://roboskin.ai.example.com/datasets', 'mailto:a@example.com', '/contact?email=private@example.com', '/robot-skin']) {
    assert.equal(analytics.analyticsResourceEvent(origin, href), null);
  }
  assert.equal(analytics.analyticsResourceEvent('https://preview.vercel.app/', '/datasets'), null);
});

test('resource click collection respects consent, withdrawal and route changes', () => {
  const app = mount(); app.render(); app.clickLink('/datasets');
  assert.equal(app.commands().length, 0);
  app.click('Allow analytics'); app.clickLink('/datasets'); app.navigate('/tactile-ai');
  app.clickLink('/resources/tactile-experiment-worksheet.csv?email=private@example.com');
  const resources = () => app.commands().filter(args => ['resource_open', 'resource_download'].includes(args[1]));
  assert.deepEqual(resources().map(args => args[1]), ['resource_open', 'resource_download']);
  assert.equal(resources()[1][2].from_path, '/tactile-ai');
  assert.ok(!JSON.stringify(app.commands()).includes('private@example.com'));
  app.settings(); app.click('Decline'); app.clickLink('/datasets');
  assert.equal(resources().length, 2);
  app.settings(); app.click('Allow analytics'); app.clickLink('/datasets');
  assert.equal(resources().length, 3);
});

test('approved landing campaign survives a pre-consent navigation without retaining arbitrary query values', () => {
  const app = mount({path: `/?utm_source=x&utm_medium=social&utm_campaign=${analytics.resourceCampaign}&email=private@example.com`});
  app.render(); app.navigate('/tactile-ai'); app.click('Allow analytics');
  const config = app.commands().find(args => args[0] === 'config')[2];
  assert.equal(config.campaign_source, 'x');
  assert.equal(config.campaign_name, analytics.resourceCampaign);
  assert.equal(config.page_location, 'https://roboskin.ai/tactile-ai');
  assert.ok(!JSON.stringify(app.commands()).includes('private@example.com'));
});

test('consent initializes once, handles navigation, and supports withdrawal', () => {
  const app = mount(); app.render(); app.click('Allow analytics');
  assert.equal(app.nodes().filter(n => n.type === 'Script').length, 1);
  app.render(); app.navigate('/datasets?email=test@example.com'); app.render();
  assert.equal(app.commands().filter(args => args[0] === 'config').length, 1);
  assert.equal(app.commands().find(args => args[0] === 'config')[2].send_page_view, false);
  assert.equal(app.commands().filter(args => args[0] === 'event').length, 2);
  assert.ok(!JSON.stringify(app.commands()).includes('test@example.com'));
  app.settings(); app.click('Decline'); app.navigate('/contact');
  assert.equal(app.window['ga-disable-G-TEST123'], true);
  assert.equal(app.commands().filter(args => args[0] === 'event').length, 2);
  app.settings(); app.click('Allow analytics');
  assert.equal(app.window['ga-disable-G-TEST123'], false);
  assert.equal(app.commands().filter(args => args[0] === 'event').length, 3);
});

test('saved choices, absent configuration, previews, and blocked storage are handled', () => {
  for (const options of [{ saved: 'denied' }, { hostname: 'localhost', saved: 'granted' }, { id: '', saved: 'granted' }]) {
    const app = mount(options); app.render(); assert.equal(app.commands().length, 0);
    assert.equal(app.nodes().some(n => n.type === 'Script'), false);
  }
  const returning = mount({ saved: 'granted' }); returning.render();
  assert.equal(returning.commands().filter(args => args[0] === 'event').length, 1);
  const blocked = mount({ storageThrows: true }); blocked.render(); blocked.click('Allow analytics');
  assert.equal(blocked.commands().filter(args => args[0] === 'event').length, 1);
});
