import { mkdir, writeFile } from 'node:fs/promises';

const sitemapUrl = 'https://roboskin.ai/sitemap.xml';
const response = await fetch(sitemapUrl, {
  headers: { 'user-agent': 'RoboSkin URL contract snapshot/1.0' },
});

if (!response.ok) {
  throw new Error(`Could not fetch ${sitemapUrl}: ${response.status}`);
}

const xml = await response.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => match[1].trim());

if (urls.length !== 65) {
  throw new Error(`Expected the audited 65 production URLs, received ${urls.length}`);
}

for (const url of urls) {
  let origin;

  try {
    origin = new URL(url).origin;
  } catch {
    throw new Error(`Unexpected sitemap URL origin: ${url}`);
  }

  if (origin !== 'https://roboskin.ai') {
    throw new Error(`Unexpected sitemap URL origin: ${url}`);
  }
}

urls.sort();

await mkdir(new URL('../config/', import.meta.url), { recursive: true });
await writeFile(
  new URL('../config/protected-urls.json', import.meta.url),
  `${JSON.stringify(urls, null, 2)}\n`,
  'utf8',
);
await writeFile(
  new URL('../config/protected-redirects.json', import.meta.url),
  '{}\n',
  { encoding: 'utf8', flag: 'wx' },
).catch((error) => {
  if (error.code !== 'EEXIST') throw error;
});

console.log(`Protected ${urls.length} production URLs from ${sitemapUrl}`);
