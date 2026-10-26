import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import * as delivery from '../src/lib/form-delivery.mjs';
import { researchInquiryEvent } from '../src/lib/research-inquiry-analytics.mjs';

const compiled = ts.transpileModule(readFileSync('src/components/CommercialInquiryForm.tsx', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;

function mount(fetcher) {
  const hooks = []; let index = 0; let tree; const stages = []; const requests = []; const exports = {};
  runInNewContext(compiled, {
    exports, process: { env: { NEXT_PUBLIC_CONTACT_FORM_ENDPOINT: '/api/contact' } },
    require(name) {
      if (name === 'react/jsx-runtime') return { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) };
      if (name === 'react') return {
        useRef(initial) { return hooks[index++] ??= { current: initial }; },
        useState(initial) { const i = index++; hooks[i] ??= { value: initial }; return [hooks[i].value, value => { hooks[i].value = typeof value === 'function' ? value(hooks[i].value) : value; }]; },
      };
      if (name === '@vercel/analytics') return { track() {} };
      if (name === '@/content/site') return { site: { contact: { inquiryEmail: 'test@example.invalid' } } };
      if (name === '@/components/AntiSpamChallenge') return { default: 'AntiSpamChallenge' };
      if (name === '@/lib/research-inquiry-analytics.mjs') return { emitResearchInquiryStage: stage => stages.push(stage) };
      if (name === '@/lib/form-delivery.mjs') return {
        ...delivery,
        submitInquiry: (endpoint, payload) => delivery.submitInquiry(endpoint, payload, async (...args) => { requests.push(args); return fetcher(...args); }),
      };
      throw new Error(`Unexpected import ${name}`);
    },
  });
  function nodes(node) { return Array.isArray(node) ? node.flatMap(nodes) : node && typeof node === 'object' ? [node, ...nodes(node.props?.children)] : []; }
  function render() { index = 0; tree = exports.default(); }
  function change(predicate, value, checked = false) {
    nodes(tree).find(predicate).props.onChange({ target: { value, checked } }); render();
  }
  render();
  return {
    stages, requests,
    fill() {
      change(n => n.type === 'input' && n.props.autoComplete === 'name', 'Private name');
      change(n => n.type === 'input' && n.props.autoComplete === 'organization', 'Private company');
      change(n => n.type === 'input' && n.props.type === 'email', 'private@example.com');
      change(n => n.type === 'textarea', 'Private decision details');
      change(n => n.type === 'input' && n.props.type === 'checkbox' && n.props.required, '', true);
    },
    submit() { const result = tree.props.onSubmit({ preventDefault() {} }); render(); return result.finally(render); },
  };
}

test('accepted stage requires an acknowledged delivery, with no form content in telemetry', async () => {
  const app = mount(async () => Response.json({ ok: true, status: 'accepted', receiptId: 'local-only' }));
  app.fill();
  assert.deepEqual(app.stages, ['start']);
  await app.submit();
  assert.deepEqual(app.stages, ['start', 'submit', 'accepted']);
  assert.equal(app.requests.length, 1);
  assert.ok(app.requests[0][1].body.includes('Private decision details'), 'the actual delivery still receives its intended fields');
  assert.ok(!JSON.stringify(app.stages).includes('Private'));
  app.fill();
  assert.deepEqual(app.stages, ['start', 'submit', 'accepted', 'start'], 'a new inquiry can start after success');
});

test('validation, unacknowledged HTTP 200 and delivery failure never count as accepted', async () => {
  const invalid = mount(async () => { throw new Error('must not fetch invalid input'); });
  await invalid.submit();
  assert.deepEqual(invalid.stages, ['submit', 'error']);
  assert.equal(invalid.requests.length, 0);
  for (const fetcher of [async () => Response.json({ ok: true }), async () => Response.json({ success: false }, { status: 503 }), async () => { throw new Error('timeout'); }]) {
    const app = mount(fetcher); app.fill(); await app.submit();
    assert.deepEqual(app.stages, ['start', 'submit', 'error']);
  }
});

test('repeated submits while a request is pending emit one attempt and one accepted result', async () => {
  let finish;
  const app = mount(() => new Promise(resolve => { finish = resolve; }));
  app.fill(); const first = app.submit(); await app.submit();
  assert.deepEqual(app.stages, ['start', 'submit']);
  assert.equal(app.requests.length, 1);
  finish(Response.json({ success: 'true' })); await first;
  assert.deepEqual(app.stages, ['start', 'submit', 'accepted']);
});

test('stage validation excludes preview hosts, lookalike origins, unrelated routes and arbitrary details', () => {
  for (const location of ['https://preview.vercel.app/research-services', 'https://roboskin.ai.evil.example/research-services', 'http://roboskin.ai/research-services', 'https://roboskin.ai/contact', 'invalid']) {
    assert.equal(researchInquiryEvent(location, 'accepted'), null);
  }
  for (const stage of ['private@example.com', { stage: 'accepted' }, null]) assert.equal(researchInquiryEvent('https://roboskin.ai/research-services', stage), null);
});
