import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const { getResearchTopicLinks } = await import(new URL('../src/lib/topic-graph.ts', import.meta.url));

const tactileChildren = new Set([
  '/tactile-ai',
  '/datasets',
  '/benchmarks',
  '/sensors',
  '/robot-skin',
  '/tactile-foundation-models',
  '/humanoid-robot-skin',
  '/tactile-manipulation',
  '/visuo-tactile',
  '/physical-ai-touch',
]);

const topicInput = (title) => ({ title, category: 'Robotics', technicalFocus: [] });
const hrefs = (title) => getResearchTopicLinks(topicInput(title)).map((link) => link.href);

test('general robot concepts resolve to broad parents without tactile children', () => {
  const cases = [
    ['A vision-language-action VLA policy', '/robot-vla-models'],
    ['A predictive robot world model', '/robot-world-models'],
    ['Reinforcement learning and policy learning', '/robot-learning'],
    ['A robotics dataset and benchmark', '/robotics-datasets'],
    ['Teleoperation demonstration collection', '/robot-teleoperation'],
    ['A humanoid locomotion system', '/humanoid-robots'],
    ['Dexterous robot manipulation', '/robot-manipulation'],
  ];

  for (const [title, expectedParent] of cases) {
    const links = hrefs(title);
    assert.ok(links.includes(expectedParent), `${title} should link to ${expectedParent}`);
    assert.equal(
      links.some((link) => tactileChildren.has(link)),
      false,
      `${title} must not receive a tactile child without explicit touch context`,
    );
  }
});

test('explicit tactile context adds relevant touch children after broad parents', () => {
  const links = hrefs('A tactile world model for contact-rich robot manipulation');

  assert.ok(links.includes('/robot-world-models'));
  assert.ok(links.includes('/robot-manipulation'));
  assert.ok(links.includes('/tactile-ai'));
  assert.ok(links.includes('/tactile-foundation-models'));
  assert.ok(links.includes('/tactile-manipulation'));
  assert.ok(links.indexOf('/robot-world-models') < links.indexOf('/tactile-ai'));
});

test('tactile extensions distinguish broad and contact-specific datasets and humanoids', () => {
  const links = hrefs('A tactile dataset benchmark for humanoid robot skin contact');

  for (const expected of ['/robotics-datasets', '/humanoid-robots', '/tactile-ai', '/datasets', '/humanoid-robot-skin']) {
    assert.ok(links.includes(expected), `missing ${expected}`);
  }
  assert.ok(links.indexOf('/robotics-datasets') < links.indexOf('/datasets'));
});

test('topic links are unique and capped for readable article navigation', () => {
  const links = hrefs(
    'Tactile VLA world model policy learning dataset benchmark teleoperation demonstration for humanoid robot hand manipulation safety',
  );

  assert.ok(links.length <= 6);
  assert.equal(new Set(links).size, links.length);
  assert.ok(links.includes('/tactile-ai'), 'dense articles with touch context must retain a tactile child');
});

test('news articles use the topic classifier and dynamic robotics headings', async () => {
  const newsPage = await read('src/app/news/[id]/page.tsx');

  assert.match(newsPage, /getResearchTopicLinks\(post\)/);
  assert.match(newsPage, /aria-label="Related topic links"/);
  assert.match(newsPage, /Related robotics news/);
  assert.match(newsPage, /Related tactile robotics news/);
  assert.doesNotMatch(newsPage, /Related robot skin news/);
});
