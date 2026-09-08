import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

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
  runInNewContext(compiled, {
    exports,
    document: { ...listeners, referrer },
    window: listeners,
    require(name) {
      if (name === '@vercel/analytics') return { track: (event, properties) => events.push({ event, ...properties }) };
      if (name === 'next/navigation') return { usePathname: () => pathname };
      if (name === 'react') return {
        useRef(value) { return refs[refIndex++] ??= { current: value }; },
        useEffect(effect) { effects.push(effect); },
      };
      throw new Error(`Unexpected import: ${name}`);
    },
  });
  return {
    events,
    render(path) {
      pathname = path;
      refIndex = 0;
      effects = [];
      exports.default();
      // Replaying effects also exercises React Strict Mode's development replay.
      for (const effect of effects) {
        effect()?.();
        effect()?.();
      }
    },
  };
}

test('a search referral is attributed only to the initial document landing', () => {
  const tracker = mountTracker('https://www.google.com/');
  tracker.render('/datasets');
  tracker.render('/research-index');
  tracker.render('/contact');
  assert.deepEqual(tracker.events, [{ event: 'Referral Landing', source: 'Google', path: '/datasets' }]);
});

test('direct visits remain unattributed through internal navigation', () => {
  const tracker = mountTracker('');
  tracker.render('/datasets');
  tracker.render('/research-index');
  assert.deepEqual(tracker.events, []);
});
