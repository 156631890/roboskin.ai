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

  assert.match(home, /Robot skin and tactile AI authority portal/i);
  assert.match(home, /Strategic acquisition conversation/i);
  assert.match(home, /sponsorship/i);
  assert.match(home, /ConversionPathPanel/);
  assert.match(site, /authorityLinkGroups/);
  assert.match(site, /directAnswerBlocks/);
  assert.match(site, /researchResourceIndex/);
  assert.match(site, /Humanoid Tactile Stack Map/);
  assert.match(site, /domain acquisition/i);
  assert.match(site, /sponsorship/i);
  assert.match(navigation, /Request Brief/);
  assert.match(contactForm, /Brief \/ report request/);
  assert.match(contactForm, /Strategic acquisition/);
  assert.match(contactForm, /Partnership \/ sponsorship/);
  assert.match(contactPage, /brief, partnership, sponsorship, or strategic inquiry/i);
  assert.match(resources, /State of Tactile AI/);
});
