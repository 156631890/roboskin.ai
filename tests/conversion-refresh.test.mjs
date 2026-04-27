import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('public pages use buyer-facing copy instead of internal positioning notes', async () => {
  const [home, site] = await Promise.all([
    read('src/app/page.tsx'),
    read('src/content/site.ts'),
  ]);

  const combined = `${home}\n${site}`;

  assert.doesNotMatch(combined, /acquisition-ready|The page should|public story|dead downloads|No invented benchmarks/i);
  assert.match(home, /Engineered tactile sensing for robot hands, grippers, and curved surfaces/i);
  assert.match(home, /Layered tactile system/i);
});

test('privacy and terms pages use readable dark-theme text colors', async () => {
  const [privacy, terms] = await Promise.all([
    read('src/app/privacy/page.tsx'),
    read('src/app/terms/page.tsx'),
  ]);

  for (const source of [privacy, terms]) {
    assert.doesNotMatch(source, /text-\[#111318\]|text-\[#4f5560\]|text-\[#2e5bff\]|text-\[#2446c8\]/);
    assert.match(source, /text-white/);
    assert.match(source, /text-soft/);
    assert.match(source, /text-accent/);
  }
});

test('contact path is short-first with optional engineering detail and a product guide', async () => {
  const [contactForm, products, downloads, site] = await Promise.all([
    read('src/components/ContactForm.tsx'),
    read('src/app/products/page.tsx'),
    read('src/app/downloads/page.tsx'),
    read('src/content/site.ts'),
  ]);

  assert.match(contactForm, /Project details/);
  assert.match(contactForm, /optional/i);
  assert.match(contactForm, /try\s*\{/);
  assert.match(contactForm, /catch/);
  assert.doesNotMatch(contactForm, /Robot platform[\s\S]{0,320}required/);
  assert.doesNotMatch(contactForm, /Target surface[\s\S]{0,320}required/);
  assert.doesNotMatch(contactForm, /Use case[\s\S]{0,320}required/);

  assert.match(site, /decisionGuideQuestions/);
  assert.match(products, /Find your starting point/);
  assert.match(downloads, /What you receive/);
});
