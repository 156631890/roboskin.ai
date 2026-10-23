import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import * as growthBatches from '../src/lib/growth-batches.mjs';
import * as referralAttribution from '../src/lib/referral-attribution.mjs';

const source = readFileSync('src/components/AnalyticsTracker.tsx', 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;

function mountTracker(referrer) {
  const events = [];
  const refs = [];
  let refIndex = 0;
  let effects = [];
  let pathname = '/datasets';
  const exports = {};
  const listeners = { addEventListener() {}, removeEventListener() {} };
  const documentListeners = new Map();
  const window = { ...listeners, location: { href: 'https://roboskin.ai/datasets', origin: 'https://roboskin.ai' } };
  runInNewContext(compiled, {
    exports,
    document: { referrer, addEventListener: (name, handler) => documentListeners.set(name, handler), removeEventListener: name => documentListeners.delete(name) },
    window,
    URL,
    require(name) {
      if (name === '@vercel/analytics') return { track: (event, properties) => events.push({ event, ...properties }) };
      if (name === 'next/navigation') return { usePathname: () => pathname };
      if (name === '@/lib/growth-batches.mjs') return growthBatches;
      if (name === '@/lib/referral-attribution.mjs') return referralAttribution;
      if (name === 'react') return {
        useRef(value) { return refs[refIndex++] ??= { current: value }; },
        useEffect(effect) { effects.push(effect); },
      };
      throw new Error(`Unexpected import: ${name}`);
    },
  });
  return {
    events,
    clickLink(href) {
      documentListeners.get('click')?.({ target: { closest: () => ({ href, textContent: 'Download resource', hasAttribute: () => false }) } });
    },
    render(path) {
      window.location.href = new URL(path, 'https://roboskin.ai').href;
      pathname = new URL(window.location.href).pathname;
      refIndex = 0;
      effects = [];
      exports.default();
      // Replaying effects also exercises React Strict Mode's development replay.
      for (const effect of effects) {
        effect()?.();
        effect();
      }
    },
  };
}

test('a search referral is attributed only to the initial document landing', () => {
  const tracker = mountTracker('https://www.google.com/');
  tracker.render('/datasets');
  tracker.render('/research-index');
  tracker.render('/contact');
  assert.deepEqual(tracker.events, [{ event: 'Referral Landing', source: 'Google', path: '/datasets', batch: 'existing-site' }]);
});

test('direct visits remain unattributed through internal navigation', () => {
  const tracker = mountTracker('');
  tracker.render('/datasets');
  tracker.render('/research-index');
  assert.deepEqual(tracker.events, []);
});

test('current and legacy ChatGPT referrers each produce one landing event', () => {
  for (const referrer of ['https://chatgpt.com/c/private', 'https://chat.openai.com/c/private']) {
    const tracker = mountTracker(referrer);
    tracker.render('/tactile-ai');
    tracker.render('/datasets');
    assert.deepEqual(tracker.events, [{ event: 'Referral Landing', source: 'ChatGPT', path: '/tactile-ai', batch: growthBatches.growthBatchForPath('/tactile-ai') }]);
  }
});

test('a single ChatGPT source tag recovers an empty referrer without leaking query values', () => {
  const tracker = mountTracker('');
  tracker.render('/tactile-ai?utm_source=chatgpt.com&utm_medium=private@example.com&utm_campaign=private&q=secret#private');
  tracker.render('/datasets');
  tracker.render('/tactile-ai?utm_source=chatgpt.com');
  assert.deepEqual(tracker.events, [{ event: 'Referral Landing', source: 'ChatGPT', path: '/tactile-ai', batch: growthBatches.growthBatchForPath('/tactile-ai') }]);
});

test('unknown and duplicate source tags stay unattributed', () => {
  for (const query of ['utm_source=chatgpt', 'utm_source=openai.com', 'utm_source=chatgpt.com.evil.example', 'utm_source=chatgpt.com&utm_source=chatgpt.com', 'utm_source=chatgpt.com&utm_source=private']) {
    const tracker = mountTracker('');
    tracker.render(`/datasets?${query}`);
    assert.deepEqual(tracker.events, []);
  }
});

test('hostname boundaries reject lookalikes, embedded paths and unrelated OpenAI visits', () => {
  for (const referrer of ['https://chatgpt.com.evil.example/', 'https://evilchatgpt.com/', 'https://unrelated.example/chatgpt.com', 'https://unrelated.example/?next=https://chatgpt.com', 'https://chatgpt.com@unrelated.example/', 'https://openai.com/', 'https://google.com.evil.example/', 'javascript:chatgpt.com', 'not a URL']) {
    const tracker = mountTracker(referrer);
    tracker.render('/datasets');
    assert.deepEqual(tracker.events, [], referrer);
  }
});

test('source tags do not override a document referrer or create referrals during internal navigation', () => {
  const google = mountTracker('https://www.google.com/');
  google.render('/datasets?utm_source=chatgpt.com');
  assert.equal(google.events[0].source, 'Google');
  for (const referrer of ['https://roboskin.ai/tactile-ai', 'https://unrelated.example/']) {
    const tracker = mountTracker(referrer);
    tracker.render('/datasets?utm_source=chatgpt.com');
    assert.deepEqual(tracker.events, []);
  }
  const direct = mountTracker('');
  direct.render('/datasets');
  direct.render('/tactile-ai?utm_source=chatgpt.com');
  assert.deepEqual(direct.events, []);
});

test('tutorial visits survive repeated effects and count a return navigation', () => {
  const tracker = mountTracker('');
  tracker.render('/guides/python-tactile-data-processing');
  tracker.render('/guides/python-tactile-data-processing');
  tracker.render('/datasets');
  tracker.render('/guides/python-tactile-data-processing');
  assert.equal(tracker.events.length, 2);
  assert.ok(tracker.events.every(event => event.event === 'Tutorial Visit' && event.batch === 'programming-2026-09-16'));
});

test('resource downloads retain tutorial tracking and add the same-origin sensor template', () => {
  const tracker = mountTracker('');
  tracker.render('/datasets');
  const paths = [
    '/tutorials/lerobot-validation/lerobot-numeric-validation.zip',
    '/tutorials/lerobot-loader/lerobot-official-loader.zip',
    '/resources/tactile-sensor-evaluation-template.csv',
  ];
  for (const path of paths) tracker.clickLink(`${path}?email=private@example.com#private`);
  assert.deepEqual(tracker.events.map(event => event.event), ['Tutorial Example Download', 'Tutorial Example Download', 'Sensor Evaluation Template Download']);
  assert.deepEqual(tracker.events.map(event => event.target), paths);
  assert.ok(tracker.events.every(event => event.from === '/datasets'));
  assert.ok(!JSON.stringify(tracker.events).includes('private'));
  tracker.clickLink('https://other.example/resources/tactile-sensor-evaluation-template.csv');
  assert.equal(tracker.events.filter(event => event.event === 'Sensor Evaluation Template Download').length, 1);
  assert.equal(tracker.events.at(-1).event, 'Source Open');
});
