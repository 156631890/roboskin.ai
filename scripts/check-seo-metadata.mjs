import path from 'node:path';
import { realpathSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { createTypeScriptLoader } from './lib/load-typescript.mjs';
import { assertSeoBudget, resolveArticleSeo } from '../src/lib/seo-budget.mjs';
const load = createTypeScriptLoader();
export function contentSeoRecords() {
  return [
    ...load('src/lib/news-data.ts').newsPosts.map((p) => ({ path: `/news/${p.id}`, ...resolveArticleSeo(p) })),
    ...load('src/lib/blog-data.ts').blogPosts.map((p) => ({ path: `/research/${p.id}`, ...resolveArticleSeo(p) })),
    ...load('src/content/seo-topic-pages.ts').seoTopicPages,
    ...load('src/lib/seo.ts').seoRoutes,
  ];
}
if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(path.resolve(process.argv[1]))).href) {
  let failed = false;
  for (const record of contentSeoRecords()) {
    try { assertSeoBudget(record.path, record); } catch (error) { failed = true; console.error(error.message); }
  }
  if (failed) process.exitCode = 1;
  else console.log('Editorial SEO budgets passed, including fallback fields and title suffix.');
}
