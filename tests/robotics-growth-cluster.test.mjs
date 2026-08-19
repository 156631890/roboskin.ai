import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

const routes = {
  humanoids: '/humanoid-robots',
  vla: '/robot-vla-models',
  manipulation: '/robot-manipulation',
};

test('broad robotics topics route search demand back into the RoboSkin tactile authority graph', async () => {
  const [topics, site, home, llms, keywordMatrix, monitoring, indexing, humanoids, vla, manipulation] = await Promise.all([
    read('src/content/seo-topic-pages.ts'),
    read('src/content/site.ts'),
    read('src/app/page.tsx'),
    read('public/llms.txt'),
    read('docs/seo/keyword-query-matrix.md'),
    read('docs/seo/search-console-monitoring.md'),
    read('docs/seo/indexing-submission-log.md'),
    read('src/app/humanoid-robots/page.tsx'),
    read('src/app/robot-vla-models/page.tsx'),
    read('src/app/robot-manipulation/page.tsx'),
  ]);

  for (const path of Object.values(routes)) {
    assert.match(topics, new RegExp(`path: '${path}'`));
    assert.match(site, new RegExp(`href: '${path}'`));
    assert.match(llms, new RegExp(`https://roboskin\\.ai${path}`));
    assert.match(keywordMatrix, new RegExp(`https://roboskin\\.ai${path}`));
    assert.match(monitoring, new RegExp(`https://roboskin\\.ai${path}`));
    assert.match(indexing, new RegExp(`https://roboskin\\.ai${path}`));
  }

  assert.match(humanoids, /getSeoTopicPage\('\/humanoid-robots'\)/);
  assert.match(vla, /getSeoTopicPage\('\/robot-vla-models'\)/);
  assert.match(manipulation, /getSeoTopicPage\('\/robot-manipulation'\)/);

  assert.match(home, /Track humanoid robots, Physical AI, embodied AI, and robot manipulation/);
  assert.match(topics, /path: '\/humanoid-robots'[\s\S]*href: '\/humanoid-robot-skin'/);
  assert.match(topics, /path: '\/robot-vla-models'[\s\S]*href: '\/tactile-foundation-models'/);
  assert.match(topics, /path: '\/robot-manipulation'[\s\S]*href: '\/tactile-manipulation'/);
  assert.match(topics, /International Federation of Robotics 2026 trends/);
  assert.match(topics, /Google DeepMind Gemini Robotics 2/);
  assert.match(topics, /T-Rex tactile-reactive manipulation preprint/);
  assert.match(topics, /ReTouch contact-rich manipulation preprint/);
});
