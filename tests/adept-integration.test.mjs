import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

function recordById(source, id) {
  const start = source.indexOf(`id: '${id}'`);
  assert.notEqual(start, -1, `missing record ${id}`);
  const next = source.indexOf("\n  {\n    id: '", start + id.length + 10);
  const arrayEnd = source.indexOf('\n];', start);
  const end = [next, arrayEnd].filter((position) => position > start).sort((a, b) => a - b)[0] ?? source.length;
  return source.slice(start, end);
}

test('ADEPT brief preserves paper metadata, physical results, access state, and evidence boundaries', async () => {
  const posts = await read('src/lib/blog-data.ts');
  const article = recordById(posts, 'adept-visuo-tactile-dexterity-rl-2026');

  for (const signal of [
    'August 19, 2026 arXiv v1 preprint',
    'Jayjun Lee, Jessica Yin, Asif Rana, Nicholas Blauch, Sam Mady, Mohak Bhardwaj, Nima Fazeli, Nathan Ratliff, Karl Van Wyk, and Ankur Handa',
    'NVIDIA and Michigan Robotics at the University of Michigan',
    '| KUKA-Allegro, vision, FMB star | 10/10 | 9/10 | 8/10 | 8/10 | 7/10 | 5/10 |',
    '| KUKA-Allegro, vision, FMB square/round | 10/10 | 8/10 | 6/10 | 4/10 | 3/10 | 3/10 |',
    '| Flexiv-Sharpa, vision, FMB square/round | 10/10 | 7/10 | 5/10 | 3/10 | 3/10 | 3/10 |',
    '| Flexiv-Sharpa, visuo-tactile, FMB square/round | 10/10 | 10/10 | 10/10 | 9/10 | 8/10 | 8/10 |',
    '| KUKA-Allegro, vision, dish placement | 10/10 | 10/10 | 8/10 | 7/10 | 6/10 | 6/10 |',
    'Each condition contains ten physical trials',
    'Code control says **Coming soon**',
    'no verified training implementation, model weights, checkpoint release, demonstration dataset, artifact license',
    'https://arxiv.org/abs/2608.19182',
    'https://adept-dexterity.github.io/',
  ]) {
    assert.match(article, new RegExp(signal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
  }

  assert.doesNotMatch(article, /SharpaWave|RealSense D435|code is (?:public|open-source)|publicly released (?:weights|dataset)/i);
});

test('ADEPT model and robot configurations remain embodiment-specific', async () => {
  const [models, robots] = await Promise.all([
    read('src/lib/robot-ai-models.ts'),
    read('src/lib/research-robots.ts'),
  ]);
  const model = recordById(models, 'adept');
  const kuka = recordById(robots, 'kuka-iiwa7-allegro-configuration');
  const flexiv = recordById(robots, 'flexiv-rizon-sharpa-configuration');

  assert.match(model, /category: 'robot policy'/);
  assert.match(model, /creatorOrganizations: \['NVIDIA', 'University of Michigan'\]/);
  assert.match(model, /tactileInput: 'yes'/);
  assert.match(model, /Flexiv-Sharpa branch only/);
  assert.match(model, /3\/10 with vision only and 8\/10 with visuo-tactile/);
  assert.match(model, /Code “Coming soon”|labels code “Coming soon”/i);
  assert.doesNotMatch(model, /category: '(?:VLA|tactile model|world model)'|SharpaWave|RealSense D435/i);

  assert.match(kuka, /7-DoF KUKA iiwa7 arm, a 16-DoF Allegro Hand/);
  assert.match(kuka, /23-DoF vision-only student policy/);
  assert.match(kuka, /does not add tactile input to the KUKA branch/);
  assert.doesNotMatch(kuka, /RealSense D435|tactile sensor/i);

  assert.match(flexiv, /7-DoF Flexiv Rizon arm, a 22-DoF five-finger Sharpa hand/);
  assert.match(flexiv, /five fingertip vision-based tactile sensors/);
  assert.match(flexiv, /29-DoF student policy/);
  assert.match(flexiv, /must not be relabeled SharpaWave/);
});

test('ADEPT graph relations connect the paper, policy, organizations, and both robot setups without inventing artifacts', async () => {
  const [organizations, robots, relations] = await Promise.all([
    read('src/lib/research-organizations.ts'),
    read('src/lib/research-robots.ts'),
    read('src/lib/research-entity-relations.ts'),
  ]);

  assert.match(organizations, /modelId: 'adept'[\s\S]*?relation: 'contributedBy'[\s\S]*?institutional ownership/);
  assert.match(relations, /fromId: 'adept-visuo-tactile-dexterity-rl-2026'[\s\S]*?organizationId: 'nvidia'[\s\S]*?organizationId: 'university-of-michigan'/);
  assert.match(relations, /relation: 'introduces'[\s\S]*?fromId: 'adept-visuo-tactile-dexterity-rl-2026'[\s\S]*?toId: 'adept'/);

  for (const robotId of ['kuka-iiwa7-allegro-configuration', 'flexiv-rizon-sharpa-configuration']) {
    assert.match(robots, new RegExp(`modelId: 'adept'[\\s\\S]*?robotId: '${robotId}'[\\s\\S]*?relation: 'trainedAcross'`));
    assert.match(robots, new RegExp(`modelId: 'adept'[\\s\\S]*?robotId: '${robotId}'[\\s\\S]*?relation: 'evaluatedOn'`));
  }

  assert.doesNotMatch(relations, /fromId: 'adept-visuo-tactile-dexterity-rl-2026'[\s\S]{0,250}?relation: 'usesSensor'/);
  assert.doesNotMatch(relations, /fromId: 'adept'[\s\S]{0,250}?toType: 'dataset'/);
});
