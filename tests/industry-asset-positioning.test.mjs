import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('site presents RoboSkin.ai as a tactile AI industry asset with clear conversion paths', async () => {
  const [home, site, navigation, contactForm, contactPage, resources] = await Promise.all([
    read('src/app/page.tsx'),
    read('src/content/site.ts'),
    read('src/components/Navigation.tsx'),
    read('src/components/ContactForm.tsx'),
    read('src/app/contact/page.tsx'),
    read('src/app/resources/page.tsx'),
  ]);

  assert.match(home, /robot skin \/ tactile AI/i);
  assert.match(home, /Humanoid Tactile Stack Map/);
  assert.match(home, /domain acquisition/i);
  assert.match(home, /sponsorship/i);
  assert.match(site, /tactileIndustryDirections/);
  assert.match(site, /tactileAiStack/);
  assert.match(site, /contentRoadmapTopics/);
  assert.match(site, /The Tactile AI Manifesto/);
  assert.match(navigation, /Request Brief/);
  assert.match(contactForm, /Brief \/ report request/);
  assert.match(contactForm, /Strategic acquisition/);
  assert.match(contactForm, /Partnership \/ sponsorship/);
  assert.match(contactPage, /brief, partnership, sponsorship, or strategic inquiry/i);
  assert.match(resources, /State of Tactile AI/);
});
