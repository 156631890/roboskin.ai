import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(path, 'utf8');

test('homepage keeps canonical meaning while reducing repeated long-form blocks', async () => {
  const [homepage, css, loop] = await Promise.all([
    read('src/app/page.tsx'),
    read('src/app/globals.css'),
    read('src/components/AiRobotClosedLoop.tsx'),
  ]);

  assert.match(homepage, /Robot skin <span className="hero-emphasis">and tactile AI/);
  assert.match(homepage, /const homeAuthorityLinkGroups = authorityLinkGroups\.map/);
  assert.match(homepage, /<DirectAnswerSection answers=\{homeRobotSkinFaq\} \/>/);
  assert.match(homepage, /className="home-topic-rail"/);
  assert.doesNotMatch(homepage, /ResearchBriefIndex|researchResourceIndex|marketSignals/);
  assert.match(css, /\.hero-stage \{ min-height: 590px; \}/);
  assert.match(css, /grid-template-columns: repeat\(7, minmax\(15\.5rem, 82vw\)\)/);
  assert.match(css, /scroll-snap-type: inline mandatory/);
  assert.match(loop, /Swipe to follow all seven stages/);
});

test('research index exposes a versioned, licensed, citable GitHub release', async () => {
  const [release, page, jsonRoute, seo] = await Promise.all([
    read('src/lib/research-index-release.ts'),
    read('src/app/research-index/page.tsx'),
    read('src/app/research-index.json/route.ts'),
    read('src/lib/seo.ts'),
  ]);

  for (const signal of [
    'v2026.08.22',
    'https://github.com/roboskin-ai/tactile-research-index',
    'https://creativecommons.org/licenses/by/4.0/',
    'RoboSkin.ai Editorial Team',
  ]) {
    assert.match(release, new RegExp(signal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  assert.match(page, /Cite the index with its reviewed version/);
  assert.match(page, /researchIndexRelease\.repositoryUrl/);
  assert.match(jsonRoute, /version: researchIndexRelease\.version/);
  assert.match(jsonRoute, /citation: researchIndexRelease\.citation/);
  assert.match(seo, /license: researchIndexRelease\.licenseUrl/);
  assert.match(seo, /sameAs: \[researchIndexRelease\.repositoryUrl, researchIndexRelease\.releaseUrl\]/);
  assert.match(seo, /citation: researchIndexRelease\.releaseUrl/);
});

test('ROS 2 starter kit is connected to the implementation guide and agent-readable map', async () => {
  const [topics, site, llms] = await Promise.all([
    read('src/content/seo-topic-pages.ts'),
    read('src/content/site.ts'),
    read('public/llms.txt'),
  ]);
  const repository = 'https://github.com/roboskin-ai/ros2-tactile-starter-kit';

  assert.match(topics, new RegExp(repository.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(topics, /reference implementation rather than an official ROS standard/);
  assert.match(site, /title: 'ROS 2 tactile starter kit'/);
  assert.match(llms, /RoboSkin ROS 2 Tactile Starter Kit/);
  assert.match(llms, /not an official ROS standard or sensor benchmark/);
});
