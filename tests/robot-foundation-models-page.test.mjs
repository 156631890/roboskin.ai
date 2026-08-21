import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('robot foundation model pillar owns the model intent and renders the database', async () => {
  const [route, topics, schema, explorer] = await Promise.all([
    read('src/app/robot-foundation-models/page.tsx'),
    read('src/content/seo-topic-pages.ts'),
    read('src/lib/robot-ai-schema.ts'),
    read('src/components/RobotAiModelExplorer.tsx'),
  ]);

  assert.match(route, /getSeoTopicPage\('\/robot-foundation-models'\)/);
  assert.match(route, /buildRobotAiModelDirectoryJsonLd\(robotAiModelEntries\)/);
  assert.match(route, /<RobotAiModelExplorer[\s\S]*?entries=\{robotAiModelEntries\}/);
  assert.match(route, /robots=\{researchRobotEntries\}/);
  assert.match(route, /robotRelations=\{robotAiRobotRelations\}/);
  assert.match(topics, /path: '\/robot-foundation-models'/);
  assert.match(topics, /Robot Foundation Models: Data, Transfer & Evaluation/);
  assert.match(topics, /Unknown facts remain unknown/);
  assert.match(schema, /'@type': 'CreativeWork'/);
  assert.match(explorer, /Every row keeps real-robot evidence/);
});
