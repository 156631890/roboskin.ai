import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('primary navigation expresses the RoboSkin authority chain without generic top-level clutter', async () => {
  const [site, navigation, css] = await Promise.all([
    read('src/content/site.ts'),
    read('src/components/Navigation.tsx'),
    read('src/app/globals.css'),
  ]);
  const primaryNavSource = site.slice(
    site.indexOf('export const primaryNavigation'),
    site.indexOf('export const footerNavigation'),
  );
  const links = [...primaryNavSource.matchAll(/\{ href: '([^']+)', label: '([^']+)' \}/g)]
    .map(([, href, label]) => ({ href, label }));

  assert.deepEqual(links, [
    { href: '/', label: 'Home' },
    { href: '/robot-skin', label: 'Robot Skin' },
    { href: '/tactile-ai', label: 'Tactile AI' },
    { href: '/physical-ai', label: 'Physical AI' },
    { href: '/robot-foundation-models', label: 'Models & Data' },
    { href: '/research', label: 'Research' },
    { href: '/about', label: 'About' },
  ]);
  assert.match(navigation, /href !== '\/' && href !== '\/about'/);
  assert.match(navigation, /aria-current=\{active \? 'page' : undefined\}/);
  assert.match(navigation, /event\.key !== 'Escape'/);
  assert.match(navigation, /window\.innerWidth > 1100/);
  assert.match(css, /max-height: calc\(100dvh - 66px\)/);
  assert.match(css, /overscroll-behavior: contain/);
  assert.match(css, /@media \(min-width: 1101px\)[\s\S]*\.site-mobile-menu \{ display: none; \}/);
});
