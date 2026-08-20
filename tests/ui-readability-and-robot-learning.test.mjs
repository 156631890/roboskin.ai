import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

function luminance(hex) {
  const channels = hex.match(/[0-9a-f]{2}/gi).map((value) => Number.parseInt(value, 16) / 255);
  const linear = channels.map((value) => (value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));
  return (0.2126 * linear[0]) + (0.7152 * linear[1]) + (0.0722 * linear[2]);
}

function contrast(foreground, background) {
  const values = [luminance(foreground), luminance(background)].sort((left, right) => right - left);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

test('shared dark and light text tokens meet WCAG AA contrast for normal text', async () => {
  const css = await read('src/app/globals.css');
  const token = (name) => css.match(new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`, 'i'))?.[1];

  assert.ok(contrast(token('text-muted'), token('bg')) >= 4.5);
  assert.ok(contrast(token('text-soft'), token('bg')) >= 4.5);
  assert.ok(contrast(token('light-muted'), token('paper')) >= 4.5);
  assert.ok(contrast(token('light-accent'), token('paper')) >= 4.5);
  assert.doesNotMatch(css, /\.hero-topline[^}]*font-size:\s*0\.58rem/s);
  assert.match(css, /\.hero-stat dd\s*{[^}]*font-size:\s*0\.8rem/s);
});

test('robot learning becomes a crawlable parent route with source-backed internal links', async () => {
  const [page, topics, site, llms, protectedUrls, verifier, matrix, monitoring] = await Promise.all([
    read('src/app/robot-learning/page.tsx'),
    read('src/content/seo-topic-pages.ts'),
    read('src/content/site.ts'),
    read('public/llms.txt'),
    read('config/protected-urls.json'),
    read('scripts/verify-export.mjs'),
    read('docs/seo/keyword-query-matrix.md'),
    read('docs/seo/search-console-monitoring.md'),
  ]);

  assert.match(page, /getSeoTopicPage\('\/robot-learning'\)/);
  assert.match(topics, /path: '\/robot-learning'/);
  assert.match(topics, /LeRobot v0\.6\.0/);
  assert.match(topics, /Open X-Embodiment/);
  assert.match(topics, /href: '\/robot-vla-models'/);
  assert.match(topics, /href: '\/robot-manipulation'/);
  assert.match(topics, /href: '\/datasets'/);
  assert.match(site, /href: '\/robot-learning'/);
  assert.match(llms, /https:\/\/roboskin\.ai\/robot-learning/);
  assert.match(protectedUrls, /https:\/\/roboskin\.ai\/robot-learning/);
  assert.match(verifier, /\/robot-learning/);
  assert.match(matrix, /https:\/\/roboskin\.ai\/robot-learning/);
  assert.match(monitoring, /https:\/\/roboskin\.ai\/robot-learning/);
});
