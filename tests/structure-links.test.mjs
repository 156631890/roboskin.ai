import test from 'node:test';
import assert from 'node:assert/strict';
import { createTypeScriptLoader } from '../scripts/lib/load-typescript.mjs';
const { getArticleHubLink } = createTypeScriptLoader()('src/lib/structure-links.ts');
test('article hub backlinks apply ordered rules and never duplicate a linked destination', () => {
  assert.equal(getArticleHubLink('VLA dataset with DIGIT input').href, '/sensors');
  assert.equal(getArticleHubLink('LeRobot and VLA policies').href, '/datasets');
  assert.equal(getArticleHubLink('A vision-language-action policy').href, '/robot-vla-models');
  assert.equal(getArticleHubLink('An e-skin covering').href, '/robot-skin');
  assert.equal(getArticleHubLink('DIGIT dataset [sensor details](/sensors#digit)'), undefined);
  assert.equal(getArticleHubLink('DIGIT [hardware](https://roboskin.ai/sensors)'), undefined);
  assert.equal(getArticleHubLink('A [paper](https://example.org/digit) on locomotion'), undefined);
});
