import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('AI and robotics is an answer-first crawlable hub with explicit model and control boundaries', async () => {
  const [route, topics, llms, sitemap, verifier] = await Promise.all([
    read('src/app/ai-robotics/page.tsx'),
    read('src/content/seo-topic-pages.ts'),
    read('public/llms.txt'),
    read('src/app/sitemap.ts'),
    read('scripts/verify-export.mjs'),
  ]);

  assert.match(route, /getSeoTopicPage\('\/ai-robotics'\)/);
  assert.match(route, /buildSeoTopicMetadata\(page\)/);
  assert.match(route, /<SeoTopicArticle page=\{page\} \/>/);
  assert.match(topics, /path: '\/ai-robotics'/);
  assert.match(topics, /h1: 'How artificial intelligence works in robots'/);
  assert.match(topics, /Artificial intelligence and robotics are related but different/);
  assert.match(topics, /goal or instruction → multimodal observation → representation and state estimation → reasoning or planning → policy action → robot control → physical motion and contact → new observation/);

  for (const role of [
    'Vision-language model (VLM)',
    'Embodied reasoning (ER)',
    'Vision-language-action model (VLA)',
    'World model',
    'Robot policy',
    'Robot control',
  ]) {
    assert.match(topics, new RegExp(role.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  for (const routePath of [
    '/physical-ai',
    '/robot-learning',
    '/robot-vla-models',
    '/robot-world-models',
    '/robotics-datasets',
    '/robot-teleoperation',
    '/robot-manipulation',
    '/humanoid-robots',
    '/robot-safety',
    '/tactile-ai',
    '/robot-skin',
    '/physical-ai-touch',
  ]) {
    assert.match(topics, new RegExp(`href: '${routePath.replaceAll('/', '\\/')}'`));
    assert.match(llms, new RegExp(`https:\\/\\/roboskin\\.ai${routePath.replaceAll('/', '\\/')}`));
  }

  for (const source of [
    'https://deepmind.google/blog/gemini-robotics-brings-ai-into-the-physical-world/',
    'https://arxiv.org/abs/2307.15818',
    'https://arxiv.org/abs/2310.08864',
    'https://arxiv.org/abs/2503.14734',
    'https://huggingface.co/blog/lerobot-release-v060',
    'https://arxiv.org/abs/2606.17055',
  ]) {
    assert.match(topics, new RegExp(source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  assert.match(sitemap, /const topicPages = seoTopicPages\.map/);
  assert.match(verifier, /'\/ai-robotics'/);
  assert.match(llms, /What is the relationship between AI and robotics\?/);
  assert.match(llms, /Use \[AI and robotics\]\(https:\/\/roboskin\.ai\/ai-robotics\) as the canonical RoboSkin\.ai relationship and architecture route/);
});

test('Physical AI has one broad canonical URL and a separate touch child route', async () => {
  const [physicalPage, touchRoute, topics, seo, llms, vercel, protectedUrls, protectedRedirects] = await Promise.all([
    read('src/app/physical-ai/page.tsx'),
    read('src/app/physical-ai-touch/page.tsx'),
    read('src/content/seo-topic-pages.ts'),
    read('src/lib/seo.ts'),
    read('public/llms.txt'),
    read('vercel.json'),
    read('config/protected-urls.json'),
    read('config/protected-redirects.json'),
  ]);

  assert.match(physicalPage, /buildPageMetadata\('\/physical-ai'\)/);
  assert.match(physicalPage, /buildPageJsonLd\('\/physical-ai'\)/);
  assert.match(physicalPage, /buildBreadcrumbJsonLd\('\/physical-ai'\)/);
  assert.match(physicalPage, /buildFaqJsonLd\(physicalAiFaqItems, '\/physical-ai'\)/);
  assert.match(physicalPage, /Physical AI: perception, reasoning, action, and feedback/);
  assert.match(physicalPage, /href="\/physical-ai-touch"/);
  assert.match(touchRoute, /getSeoTopicPage\('\/physical-ai-touch'\)/);
  assert.match(topics, /path: '\/physical-ai-touch'[\s\S]*href: '\/physical-ai'/);

  assert.match(seo, /'\/physical-ai': \{[\s\S]*path: '\/physical-ai'/);
  assert.doesNotMatch(seo, /'\/physics-ai': \{/);
  assert.match(seo, /alternateName: \['physical-world artificial intelligence'\]/);
  assert.doesNotMatch(seo, /['"]Physics AI['"]/);
  assert.match(llms, /\[Physical AI canonical answer\]\(https:\/\/roboskin\.ai\/physical-ai\)/);
  assert.match(llms, /\[Physical AI and touch\]\(https:\/\/roboskin\.ai\/physical-ai-touch\): Contact-specific/);

  const redirects = JSON.parse(vercel).redirects;
  assert.ok(redirects.some((entry) =>
    entry.source === '/physics-ai' &&
    entry.destination === 'https://roboskin.ai/physical-ai' &&
    entry.statusCode === 301 &&
    !('permanent' in entry)
  ));
  assert.deepEqual(JSON.parse(protectedRedirects)['/physics-ai'], '/physical-ai');
  assert.ok(JSON.parse(protectedUrls).includes('https://roboskin.ai/physical-ai'));
  await assert.rejects(access(new URL('src/app/physics-ai/page.tsx', root)));
});
