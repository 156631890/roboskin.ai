import { mkdir, readFile, writeFile } from 'node:fs/promises';

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

if (urls.length !== 104) {
  throw new Error(`Expected the audited 104 production sitemap URLs, received ${urls.length}`);
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

const protectedRedirects = JSON.parse(
  await readFile(new URL('../config/protected-redirects.json', import.meta.url), 'utf8'),
);
const protectedUrls = new Set(
  urls.filter((url) => new URL(url).pathname !== '/research-index'),
);
for (const redirectSource of Object.keys(protectedRedirects)) {
  protectedUrls.add(new URL(redirectSource, 'https://roboskin.ai').href);
}
const completeProtectedUrls = [...protectedUrls].sort();

if (completeProtectedUrls.length !== 108) {
  throw new Error(`Expected 108 protected URLs after preserving redirects, received ${completeProtectedUrls.length}`);
}

await mkdir(new URL('../config/', import.meta.url), { recursive: true });
await writeFile(
  new URL('../config/protected-urls.json', import.meta.url),
  `${JSON.stringify(completeProtectedUrls, null, 2)}\n`,
  'utf8',
);

console.log(`Protected ${completeProtectedUrls.length} production and redirect URLs from ${sitemapUrl}`);
