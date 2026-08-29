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
  '/applications/robot-gripper-tactile-sensor',
  '/guides/tactile-sensor-for-robots',
  '/guides/robot-touch-sensor',
  '/guides/slip-detection-robot-hand',
  '/guides/ros2-tactile-sensing',
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
  'src/app/applications/robot-gripper-tactile-sensor/page.tsx',
  'src/app/guides/tactile-sensor-for-robots/page.tsx',
  'src/app/guides/robot-touch-sensor/page.tsx',
  'src/app/guides/slip-detection-robot-hand/page.tsx',
  'src/app/guides/ros2-tactile-sensing/page.tsx',
  'src/app/guides/robot-skin-vs-e-skin/page.tsx',
  'src/app/research/robot-skin-papers/page.tsx',
];

const oldPageLinkChecks = {
  'src/app/technology/page.tsx': ['/tactile-ai', '/guides/flexible-tactile-sensor-array'],
  'src/app/applications/page.tsx': [
    '/applications/humanoid-robot-skin',
    '/applications/robot-hand-tactile-sensor',
    '/applications/soft-robotic-skin',
    '/applications/robot-gripper-tactile-sensor',
  ],
  'src/app/research/page.tsx': ['/research/robot-skin-papers'],
  'src/app/glossary/page.tsx': ['/robot-skin', '/e-skin', '/tactile-ai'],
};

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
const readme = await read('README.md');
const monitoringDoc = await read('docs/seo/search-console-monitoring.md');

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

for (const [file, links] of Object.entries(oldPageLinkChecks)) {
  const source = await read(file);
  for (const link of links) {
    if (!source.includes(link)) {
      throw new Error(`${file} must link to ${link}`);
    }
  }
}

for (const path of ['/robot-skin', '/tactile-ai', '/research/robot-skin-papers']) {
  if (!readme.includes(`https://roboskin.ai${path}`)) {
    throw new Error(`README must link to https://roboskin.ai${path}`);
  }
}

for (const heading of ['Indexed status', 'Query performance', 'CTR triage']) {
  if (!monitoringDoc.includes(heading)) {
    throw new Error(`Search Console monitoring doc must include ${heading}`);
  }
}

console.log(`SEO topic page coverage OK: ${requiredPaths.length} paths`);
