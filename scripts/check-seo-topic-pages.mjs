import { readFile } from 'node:fs/promises';

const requiredPaths = [
  '/robot-skin',
  '/tactile-ai',
  '/e-skin',
  '/applications/humanoid-robot-skin',
  '/applications/robot-hand-tactile-sensor',
  '/applications/soft-robotic-skin',
  '/guides/flexible-tactile-sensor-array',
  '/guides/physical-ai-touch-data',
  '/guides/robot-skin-vs-e-skin',
  '/research/robot-skin-papers',
];

const routeFiles = [
  'src/app/robot-skin/page.tsx',
  'src/app/tactile-ai/page.tsx',
  'src/app/e-skin/page.tsx',
  'src/app/applications/humanoid-robot-skin/page.tsx',
  'src/app/applications/robot-hand-tactile-sensor/page.tsx',
  'src/app/applications/soft-robotic-skin/page.tsx',
  'src/app/guides/flexible-tactile-sensor-array/page.tsx',
  'src/app/guides/physical-ai-touch-data/page.tsx',
  'src/app/guides/robot-skin-vs-e-skin/page.tsx',
  'src/app/research/robot-skin-papers/page.tsx',
];

async function read(path) {
  try {
    return await readFile(path, 'utf8');
  } catch {
    throw new Error(`Missing required file: ${path}`);
  }
}

const topicContent = await read('src/content/seo-topic-pages.ts');
const sitemap = await read('src/app/sitemap.ts');
const resourcesPage = await read('src/app/resources/page.tsx');

for (const path of requiredPaths) {
  if (!topicContent.includes(`path: '${path}'`)) {
    throw new Error(`Missing SEO topic data for ${path}`);
  }
}

for (const file of routeFiles) {
  const route = await read(file);
  const expectedPath = `/${file.replace('src/app/', '').replace('/page.tsx', '')}`;
  if (!route.includes(`getSeoTopicPage('${expectedPath}')`)) {
    throw new Error(`${file} must render getSeoTopicPage('${expectedPath}')`);
  }
}

try {
  await read('src/app/[...slug]/page.tsx');
  throw new Error('Do not use a root catch-all route for SEO topics; explicit static routes are required');
} catch (error) {
  if (!String(error).includes('Missing required file')) {
    throw error;
  }
}

if (!sitemap.includes('seoTopicPages')) {
  throw new Error('Sitemap must include SEO topic pages');
}

if (!resourcesPage.includes('seoTopicPages')) {
  throw new Error('Resources page must expose the SEO topic cluster');
}

console.log(`SEO topic page coverage OK: ${requiredPaths.length} paths`);
