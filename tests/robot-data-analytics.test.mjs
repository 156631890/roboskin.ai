import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, existsSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import * as analytics from '../src/lib/google-analytics.mjs';
import { geoEvent } from '../src/lib/geoinflow.mjs';
import * as batches from '../src/lib/growth-batches.mjs';
import * as referrals from '../src/lib/referral-attribution.mjs';

const root = '/resources/robot-data/v2026.10.28/';

test('robot data resources share stable identities across GA4 and GEO', () => {
  for (const [file, id, name] of [
    ['robot-data-decision-kit.zip', 'robot-data-decision-kit', 'resource_download'],
    ['selection-matrix.csv', 'robot-data-matrix', 'resource_download'],
    ['selection-matrix.json', 'robot-data-matrix', 'resource_open'],
    ['action-contract.csv', 'robot-action-contract', 'resource_download'],
    ['decision-record.csv', 'robot-data-decision-record', 'resource_download'],
    ['README.txt', 'robot-data-instructions', 'resource_open'],
  ]) {
    const target = root + file;
    assert.ok(existsSync(`public${target}`));
    const ga = analytics.analyticsResourceEvent('https://roboskin.ai/robot-teleoperation?private=x', `${target}?email=private@example.com`);
    assert.equal(ga.name, name);
    assert.equal(ga.parameters.resource_id, id);
    const geo = geoEvent(name === 'resource_download' ? 'Robot Data Resource Download' : 'Robot Data Resource Open', {
      from: '/robot-teleoperation?private=x', target: `${target}?private=x`, resource_id: 'untrusted text', label: 'private',
    });
    assert.deepEqual(geo.data, { from: '/robot-teleoperation', target, resource_id: id });
  }
  assert.equal(geoEvent('Robot Data Resource Download', { target: '/account/private.zip' }), null);
  assert.equal(geoEvent('Robot Data Resource Download', { target: 'https://external.example' + root + 'action-contract.csv' }), null);
  assert.equal(geoEvent('Robot Data Resource Download', { target: root + 'README.txt' }), null);
});

test('a real tracker click emits one data-resource event per provider without labels or URL queries', () => {
  const compiled = ts.transpileModule(readFileSync('src/components/AnalyticsTracker.tsx', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const clicks = new Map(), vercel = [], geo = [], exports = {};
  runInNewContext(compiled, {
    exports,
    window: { location: { href: 'https://roboskin.ai/robot-teleoperation?private=x', origin: 'https://roboskin.ai' }, addEventListener() {}, removeEventListener() {} },
    document: { referrer: '', addEventListener: (name, callback) => clicks.set(name, callback), removeEventListener() {} },
    URL,
    require(name) {
      if (name === 'react') return { useRef: value => ({ current: value }), useEffect: callback => callback() };
      if (name === 'next/navigation') return { usePathname: () => '/robot-teleoperation' };
      if (name === '@vercel/analytics') return { track: (name, data) => vercel.push({ name, data }) };
      if (name === '@/lib/geoinflow.mjs') return { trackGeoEvent: (name, data) => geo.push(geoEvent(name, data)) };
      if (name === '@/lib/google-analytics.mjs') return analytics;
      if (name === '@/lib/growth-batches.mjs') return batches;
      if (name === '@/lib/referral-attribution.mjs') return referrals;
      throw new Error(name);
    },
  });
  exports.default();
  const click = href => clicks.get('click')({ target: { closest: () => ({ href, textContent: 'private label', hasAttribute: () => false }) } });
  click('https://roboskin.ai' + root + 'action-contract.csv?private=x');
  assert.equal(vercel.length, 1);
  assert.equal(geo.length, 1);
  assert.equal(vercel[0].name, 'Robot Data Resource Download');
  assert.equal(geo[0].data.resource_id, 'robot-action-contract');
  assert.ok(!JSON.stringify({ vercel, geo }).includes('private'));
  click('https://external.example' + root + 'action-contract.csv');
  assert.equal(vercel.filter(e => e.name === 'Robot Data Resource Download').length, 1);
});
