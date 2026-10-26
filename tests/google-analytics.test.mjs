import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import * as analytics from '../src/lib/google-analytics.mjs';
import * as inquiries from '../src/lib/research-inquiry-analytics.mjs';

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

function mount({ saved = null, hostname = 'roboskin.ai', id = 'G-TEST123', storageThrows = false, path = '/', referrer = 'https://www.google.com/search?q=private' } = {}) {
  const hooks = []; let index = 0; let effects = []; let tree; let dirty = true;
  const frames = new Map(); let frameId = 0;
  const listeners = new Map(); const exports = {};
  const window = { location: { hostname, href: `https://${hostname}${path}` }, addEventListener: (name, cb) => listeners.set(name, cb), removeEventListener: (name) => listeners.delete(name) };
  const documentListeners = new Map();
  const document = { referrer, title: 'RoboSkin.ai', cookie: '_ga=123; _ga_TEST123=456', addEventListener: (name, cb) => documentListeners.set(name, cb), removeEventListener: name => documentListeners.delete(name) };
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
      if (name === '@/lib/research-inquiry-analytics.mjs') return inquiries;
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
    inquiry(stage) { listeners.get(inquiries.researchInquirySignal)?.({ detail: stage }); },
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

test('research inquiry collection respects consent, route scope and fixed properties', () => {
  const app = mount({ path: '/research-services?email=private@example.com#private' });
  const events = () => app.commands().filter(args => args[0] === 'event' && args[1].startsWith('research_inquiry_'));
  app.render(); app.inquiry('start');
  assert.equal(events().length, 0);
  app.click('Allow analytics');
  for (const stage of ['start', 'submit', 'accepted', 'error']) app.inquiry(stage);
  assert.deepEqual(events().map(args => args[1]), ['research_inquiry_start', 'research_inquiry_submit', 'research_inquiry_accepted', 'research_inquiry_error']);
  for (const event of events()) assert.deepEqual(event[2], { form_id: 'research-services', page_path: '/research-services' });
  app.inquiry({ stage: 'accepted', email: 'private@example.com' });
  app.inquiry('private@example.com');
  assert.equal(events().length, 4);
  app.navigate('/contact'); app.inquiry('accepted');
  assert.equal(events().length, 4);
  app.navigate('/research-services');
  app.settings(); app.click('Decline'); app.inquiry('accepted');
  assert.equal(events().length, 4);
  app.settings(); app.click('Allow analytics');
  assert.equal(events().length, 4, 'no replay of stages observed without consent');
  app.inquiry('start');
  assert.equal(events().length, 5);
  assert.ok(!JSON.stringify(app.commands()).includes('private'));
  for (const options of [{ hostname: 'localhost', saved: 'granted' }, { id: '', saved: 'granted' }]) {
    const disabled = mount({ ...options, path: '/research-services' });
    disabled.render(); disabled.inquiry('accepted');
    assert.equal(disabled.commands().length, 0);
  }
});

test('sample and research service links complete the fixed resource funnel', () => {
  const paths = [
    ['/research-services', 'research-services', 'resource_open'],
    ['/reports/tactile-ai-robot-skin-landscape-2026', 'research-sample', 'resource_open'],
    ['/reports/roboskin-tactile-ai-robot-skin-sample-report-2026.pdf', 'research-sample-pdf', 'resource_download'],
  ];
  const app = mount({ path: '/datasets?private=value' }); app.render();
  const events = () => app.commands().filter(args => args[0] === 'event' && ['resource_open', 'resource_download'].includes(args[1]));
  for (const [path] of paths) app.clickLink(path);
  assert.equal(events().length, 0);
  app.click('Allow analytics');
  for (const [path, id, name] of paths) {
    app.clickLink(`${path}?private=value#private`);
    assert.deepEqual(events().at(-1), ['event', name, { resource_id: id, from_path: '/datasets', target_path: path }]);
    app.clickLink(`https://other.example${path}`);
  }
  assert.equal(events().length, 3);
  app.settings(); app.click('Decline');
  for (const [path] of paths) app.clickLink(path);
  assert.equal(events().length, 3);
  assert.ok(!JSON.stringify(app.commands()).includes('private'));
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

test('ChatGPT-only tags recover missing referrers using fixed campaign labels', () => {
  const location = 'https://roboskin.ai/tactile-ai?utm_source=chatgpt.com&utm_medium=private@example.com&utm_campaign=private&utm_content=secret';
  assert.deepEqual(analytics.analyticsCampaign(location, ''), { campaign_source: 'chatgpt.com', campaign_medium: 'referral' });
  assert.equal(analytics.analyticsPageUrl(location), 'https://roboskin.ai/tactile-ai');
  for (const source of ['chatgpt', 'openai.com', 'chatgpt.com.evil.example', 'private@example.com']) {
    assert.deepEqual(analytics.analyticsCampaign(`https://roboskin.ai/?utm_source=${source}`, ''), {});
  }
  assert.deepEqual(analytics.analyticsCampaign('https://roboskin.ai/?utm_source=chatgpt.com&utm_source=chatgpt.com', ''), {});
  assert.deepEqual(analytics.analyticsCampaign('https://unrelated.example/?utm_source=chatgpt.com', ''), {});
  for (const referrer of ['https://chatgpt.com/c/private', 'https://chat.openai.com/c/private', 'https://www.google.com/', 'https://roboskin.ai/datasets']) {
    assert.deepEqual(analytics.analyticsCampaign(location, referrer), {});
  }
});

test('ChatGPT attribution waits for consent and initializes once across route changes', () => {
  const app = mount({ path: '/tactile-ai?utm_source=chatgpt.com&q=private', referrer: '' });
  app.render();
  assert.equal(app.commands().length, 0);
  app.navigate('/datasets');
  assert.equal(app.commands().length, 0);
  app.click('Allow analytics');
  app.navigate('/sensors');
  app.navigate('/datasets');
  const configs = app.commands().filter(args => args[0] === 'config');
  assert.equal(configs.length, 1);
  assert.equal(configs[0][2].campaign_source, 'chatgpt.com');
  assert.equal(configs[0][2].campaign_medium, 'referral');
  assert.equal('campaign_name' in configs[0][2], false);
  assert.equal(configs[0][2].send_page_view, false);
  assert.equal(app.commands().filter(args => args[0] === 'event' && args[1] === 'page_view').length, 3);
  assert.ok(!JSON.stringify(app.commands()).includes('private'));
  app.settings(); app.click('Decline');
  const stoppedCount = app.commands().length;
  app.navigate('/tactile-ai?utm_source=chatgpt.com');
  assert.equal(app.commands().length, stoppedCount);
});

test('a source tag introduced during internal navigation cannot relabel a direct arrival', () => {
  const app = mount({ path: '/datasets', referrer: '' });
  app.render();
  app.navigate('/tactile-ai?utm_source=chatgpt.com');
  app.click('Allow analytics');
  const config = app.commands().find(args => args[0] === 'config')[2];
  assert.equal('campaign_source' in config, false);
});

test('legacy ChatGPT referrer is retained without its conversation path', () => {
  const app = mount({ saved: 'granted', path: '/tactile-ai', referrer: 'https://chat.openai.com/c/private?secret=value' });
  app.render();
  const config = app.commands().find(args => args[0] === 'config')[2];
  assert.equal(config.page_referrer, 'https://chat.openai.com/');
  assert.equal('campaign_source' in config, false);
  assert.ok(!JSON.stringify(app.commands()).includes('private'));
  assert.ok(!JSON.stringify(app.commands()).includes('secret'));
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

test('model and topic resource navigation is measured with public paths only', () => {
  const origin = 'https://roboskin.ai/news/cartesian-hand-all-linear-in-hand-manipulation?email=private@example.com';
  for (const [path, id] of [
    ['/robot-vla-models', 'vla-models'],
    ['/vla/models', 'vla-model-comparison'],
    ['/vla/timeline', 'vla-research-timeline'],
    ['/robot-foundation-models', 'robot-foundation-models'],
    ['/robot-world-models', 'robot-world-models'],
    ['/robot-skin', 'robot-skin-guide'],
    ['/tactile-ai', 'tactile-ai-guide'],
    ['/benchmarks', 'benchmark-directory'],
    ['/guides/optical-tactile-sensor-maintenance', 'optical-sensor-maintenance'],
    ['/guides/optical-vs-capacitive-tactile-sensors', 'optical-capacitive-comparison'],
    ['/sensors/melexis-tactaxis', 'melexis-tactaxis'],
    ['/sensors/robotiq-tsf-85', 'robotiq-tsf-85'],
    ['/research/bench2dex-visuo-tactile-bimanual-benchmark-2026', 'bench2dex-review'],
  ]) {
    assert.deepEqual(analytics.analyticsResourceEvent(origin, `${path}?q=private#comparison`), {
      name: 'resource_open',
      parameters: { resource_id: id, from_path: '/news/cartesian-hand-all-linear-in-hand-manipulation', target_path: path },
    });
    assert.equal(analytics.analyticsResourceEvent(`https://roboskin.ai${path}`, path), null);
    assert.equal(analytics.analyticsResourceEvent(`https://roboskin.ai${path}`, `${path}#comparison`), null);
    assert.equal(analytics.analyticsResourceEvent(`https://roboskin.ai${path}#first`, `${path}#second`), null);
  }
  // The specific worksheet keeps its identity after adding the broader topic route.
  assert.equal(analytics.analyticsResourceEvent(origin, '/tactile-ai#experiment-worksheet').parameters.resource_id, 'experiment-worksheet');
  assert.equal(analytics.analyticsResourceEvent('https://roboskin.ai/tactile-ai', '#experiment-worksheet').parameters.resource_id, 'experiment-worksheet');
  assert.equal(analytics.analyticsResourceEvent('https://roboskin.ai/tactile-ai#experiment-worksheet', '#experiment-worksheet'), null);
});

test('model resource clicks follow the existing consent and withdrawal lifecycle', () => {
  const app = mount({ path: '/news/cartesian-hand-all-linear-in-hand-manipulation' });
  const resources = () => app.commands().filter(args => args[0] === 'event' && args[1] === 'resource_open');
  app.render(); app.clickLink('/robot-vla-models');
  assert.equal(resources().length, 0);
  app.click('Allow analytics'); app.clickLink('/robot-vla-models?private=discard#vla-model-index');
  assert.equal(resources().length, 1);
  assert.equal(resources()[0][2].resource_id, 'vla-models');
  assert.equal(resources()[0][2].target_path, '/robot-vla-models');
  app.navigate('/robot-vla-models'); app.clickLink('/robot-world-models');
  assert.equal(resources().length, 2);
  assert.equal(resources()[1][2].from_path, '/robot-vla-models');
  app.settings(); app.click('Decline'); app.clickLink('/robot-foundation-models');
  assert.equal(resources().length, 2);
  assert.ok(!JSON.stringify(app.commands()).includes('discard'));
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

test('verified exercise and evaluation downloads use fixed IDs and respect consent', () => {
  const downloads = [
    ['/tutorials/lerobot-validation/lerobot-numeric-validation.zip', 'lerobot-numeric-validation'],
    ['/tutorials/lerobot-loader/lerobot-official-loader.zip', 'lerobot-official-loader'],
    ['/resources/tactile-sensor-evaluation-template.csv', 'sensor-evaluation-template'],
  ];
  const app = mount({ path: '/datasets?email=private@example.com' });
  const resources = () => app.commands().filter(args => args[0] === 'event' && args[1] === 'resource_download');
  app.render();
  for (const [path] of downloads) app.clickLink(path);
  assert.equal(resources().length, 0);
  app.click('Allow analytics');
  for (const [path, id] of downloads) {
    app.clickLink(`${path}?email=private@example.com#private`);
    assert.deepEqual(resources().at(-1)[2], { resource_id: id, from_path: '/datasets', target_path: path });
    assert.equal(analytics.analyticsResourceEvent('https://roboskin.ai/datasets', `https://other.example${path}`), null);
  }
  assert.equal(resources().length, 3);
  app.clickLink('/tutorials/lerobot-loader/unlisted.zip');
  assert.equal(resources().length, 3);
  app.settings(); app.click('Decline');
  for (const [path] of downloads) app.clickLink(path);
  assert.equal(resources().length, 3);
  assert.ok(!JSON.stringify(app.commands()).includes('private'));
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
