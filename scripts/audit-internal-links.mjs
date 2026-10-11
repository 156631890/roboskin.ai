import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import domino from '@mixmark-io/domino';

const origin = 'https://roboskin.ai';
const normalizePath = (pathname) => pathname.replace(/\/+$/, '') || '/';
const decode = (value) => { try { return decodeURIComponent(value); } catch { return value; } };
const text = (value) => value.replace(/\s+/g, ' ').trim();
const isBody = (scope) => scope === 'article' || scope === 'main';
const isNotFound = (pathname) => ['/404', '/_not-found', '/404.html', '/_not-found.html'].includes(pathname);

function linkScope(link) {
  let inArticle = false;
  let inMain = false;
  let inHeader = false;
  for (let node = link.parentNode; node; node = node.parentNode) {
    const tag = node.localName;
    if (tag === 'nav') return 'navigation';
    if (tag === 'footer') return 'footer';
    if (tag === 'header') inHeader = true;
    if (tag === 'article') inArticle = true;
    if (tag === 'main') inMain = true;
  }
  return inArticle ? 'article' : inMain ? 'main' : inHeader ? 'header' : 'other';
}

// DOM parsing ignores links quoted in Next.js/RSC scripts and does not run code.
export function inspectLinks(html, pathname) {
  const document = domino.createDocument(html);
  return {
    path: pathname,
    title: text(document.querySelector('title')?.textContent ?? ''),
    ids: new Set(Array.from(document.querySelectorAll('[id], a[name]'), (node) => node.id || node.getAttribute('name'))),
    links: Array.from(document.querySelectorAll('a[href]'), (link) => ({
      href: link.getAttribute('href'),
      text: text(link.textContent),
      scope: linkScope(link),
    })),
  };
}

function crawlDepths(adjacency) {
  const depths = new Map();
  if (!adjacency.has('/')) return depths;
  const queue = ['/'];
  depths.set('/', 0);
  for (let index = 0; index < queue.length; index += 1) {
    const source = queue[index];
    for (const target of adjacency.get(source) ?? []) {
      if (!adjacency.has(target) || depths.has(target)) continue;
      depths.set(target, depths.get(source) + 1);
      queue.push(target);
    }
  }
  return depths;
}

export function auditLinkGraph(pages, sitemapPaths, assets = new Set(), redirects = {}) {
  const uniquePaths = [...new Set(sitemapPaths)];
  const sitemapSet = new Set(uniquePaths);
  const brokenLinks = [];
  const redirectLinks = [];
  const sitemapErrors = [];
  const inbound = new Map(uniquePaths.map((pathname) => [pathname, { all: new Set(), body: new Set() }]));
  const adjacency = new Map([...pages.keys()].filter((pathname) => !isNotFound(pathname)).map((pathname) => [pathname, new Set()]));
  const bodyAdjacency = new Map([...adjacency.keys()].map((pathname) => [pathname, new Set()]));
  const linkCounts = { article: 0, main: 0, navigation: 0, footer: 0, header: 0, other: 0 };
  if (uniquePaths.length !== sitemapPaths.length) sitemapErrors.push('Sitemap contains duplicate page URLs');
  if (!uniquePaths.length) sitemapErrors.push('Sitemap contains no page URLs');
  if (!pages.has('/')) sitemapErrors.push('Homepage has no exported HTML');
  for (const pathname of uniquePaths) {
    if (!pages.has(pathname)) sitemapErrors.push(`${pathname}: sitemap page has no exported HTML`);
    if (redirects[pathname]) sitemapErrors.push(`${pathname}: redirect is listed in sitemap`);
    if (isNotFound(pathname)) sitemapErrors.push(`${pathname}: 404 page is listed in sitemap`);
  }

  // All exported pages can be crawl intermediates; issue and inlink reports use
  // sitemap source pages so generated 404/template pages cannot inflate results.
  for (const [source, page] of pages) {
    if (isNotFound(source)) continue;
    const reportSource = sitemapSet.has(source);
    for (const link of page.links) {
      let url;
      try { url = new URL(link.href, `${origin}${source}`); } catch {
        if (reportSource) brokenLinks.push({ source, ...link, reason: 'invalid-url' });
        continue;
      }
      if (!['http:', 'https:'].includes(url.protocol)) continue;
      if (![new URL(origin).hostname, 'www.roboskin.ai'].includes(url.hostname)) continue;
      if (url.port) continue;
      if (reportSource) linkCounts[link.scope] += 1;
      const originalPath = normalizePath(decode(url.pathname));
      let targetPath = originalPath;
      let fragment = url.hash;
      const chain = [];
      if (url.origin !== origin) chain.push(`${url.origin}${url.pathname} -> ${origin}${url.pathname}`);
      const visited = new Set();
      let redirectError;
      while (redirects[targetPath]) {
        if (visited.has(targetPath)) { redirectError = 'redirect-cycle'; break; }
        visited.add(targetPath);
        const destination = new URL(redirects[targetPath], origin);
        chain.push(`${targetPath} -> ${redirects[targetPath]}`);
        if (destination.origin !== origin) { redirectError = 'external-redirect'; break; }
        if (destination.hash) fragment = destination.hash;
        targetPath = normalizePath(decode(destination.pathname));
      }
      // Explicit .html links are valid only when that file was exported, and
      // still need the same fragment check as their extensionless route.
      if (!pages.has(targetPath) && assets.has(targetPath) && targetPath.endsWith('.html')) {
        targetPath = targetPath === '/index.html' ? '/' : targetPath.replace(/(?:\/index)?\.html$/, '');
      }
      const record = { source, ...link, target: targetPath };
      if (reportSource && chain.length) redirectLinks.push({ ...record, chain });
      if (redirectError) {
        if (reportSource && redirectError !== 'external-redirect') brokenLinks.push({ ...record, reason: redirectError });
        continue;
      }
      const target = pages.get(targetPath);
      if (isNotFound(targetPath) || (!target && !assets.has(targetPath))) {
        if (reportSource) brokenLinks.push({ ...record, reason: isNotFound(targetPath) ? '404-page' : 'missing-target' });
        continue;
      }
      if (!target) continue; // Downloads and other assets do not form page links.
      const anchor = decode(fragment.slice(1).split(':~:')[0]);
      if (anchor && !target.ids.has(anchor)) {
        if (reportSource) brokenLinks.push({ ...record, reason: 'missing-fragment', fragment: anchor });
      }
      if (targetPath === source) continue;
      adjacency.get(source)?.add(targetPath);
      if (isBody(link.scope)) bodyAdjacency.get(source)?.add(targetPath);
      if (reportSource) {
        inbound.get(targetPath)?.all.add(source);
        if (isBody(link.scope)) inbound.get(targetPath)?.body.add(source);
      }
    }
  }

  const depths = crawlDepths(adjacency);
  const bodyDepths = crawlDepths(bodyAdjacency);
  const records = uniquePaths.map((pathname) => ({
    path: pathname,
    title: pages.get(pathname)?.title ?? '',
    bodyInlinks: inbound.get(pathname).body.size,
    bodyInlinkSources: [...inbound.get(pathname).body].sort(),
    allInlinks: inbound.get(pathname).all.size,
    allInlinkSources: [...inbound.get(pathname).all].sort(),
    bodyOutlinks: bodyAdjacency.get(pathname)?.size ?? 0,
    allOutlinks: adjacency.get(pathname)?.size ?? 0,
    crawlDepth: depths.get(pathname) ?? null,
    bodyCrawlDepth: bodyDepths.get(pathname) ?? null,
  })).sort((a, b) => a.path.localeCompare(b.path));
  const depthHistogram = {};
  for (const page of records) {
    const key = page.crawlDepth === null ? 'unreachable' : page.crawlDepth;
    depthHistogram[key] = (depthHistogram[key] ?? 0) + 1;
  }
  return {
    summary: {
      sitemapPages: uniquePaths.length,
      exportedHtmlPages: pages.size,
      internalLinkOccurrences: Object.values(linkCounts).reduce((sum, count) => sum + count, 0),
      linksByScope: linkCounts,
      brokenLinks: brokenLinks.length,
      redirectLinks: redirectLinks.length,
      sitemapErrors: sitemapErrors.length,
      pagesWithoutBodyInlinks: records.filter((page) => page.bodyInlinks === 0).length,
      unreachablePages: records.filter((page) => page.crawlDepth === null).length,
      maxCrawlDepth: records.length ? Math.max(...records.map((page) => page.crawlDepth ?? 0)) : null,
      depthHistogram,
    },
    leastBodyInlinks: [...records].sort((a, b) => a.bodyInlinks - b.bodyInlinks || a.path.localeCompare(b.path)).slice(0, 20),
    pages: records,
    brokenLinks,
    redirectLinks,
    sitemapErrors,
  };
}

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory()
    ? listFiles(path.join(directory, entry.name))
    : [path.join(directory, entry.name)]))).flat();
}

export async function auditInternalLinks(directory, redirects) {
  const files = await listFiles(directory);
  const pages = new Map();
  const assets = new Set();
  for (const file of files) {
    const relative = path.relative(directory, file).split(path.sep).join('/');
    assets.add(`/${relative}`);
    if (!relative.endsWith('.html')) continue;
    const pathname = relative === 'index.html' ? '/' : `/${relative.replace(/(?:\/index)?\.html$/, '')}`;
    pages.set(pathname, inspectLinks(await readFile(file, 'utf8'), pathname));
  }
  const sitemap = domino.createDocument(await readFile(path.join(directory, 'sitemap.xml'), 'utf8'));
  const sitemapPaths = Array.from(sitemap.querySelectorAll('loc'), (node) => {
    const url = new URL(node.textContent.trim());
    if (url.origin !== origin) throw new Error(`Unexpected sitemap origin: ${url.origin}`);
    return normalizePath(decode(url.pathname));
  });
  const configuredRedirects = redirects ?? JSON.parse(await readFile(new URL('../config/protected-redirects.json', import.meta.url), 'utf8'));
  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    source: 'Exported HTML and configured redirects; not a live HTTP status check.',
    methodology: 'Inlinks count distinct sitemap source pages and exclude self-links. Body means article/main excluding nav/footer. Crawl depth follows links from the homepage through exported HTML, including global navigation and configured redirects; bodyCrawlDepth excludes global navigation. null means unreachable.',
    ...auditLinkGraph(pages, sitemapPaths, assets, configuredRedirects),
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const options = { '--out': 'out', '--report': '.artifacts/internal-links.json' };
  for (let index = 2; index < process.argv.length; index += 2) {
    const flag = process.argv[index];
    const value = process.argv[index + 1];
    if (!(flag in options) || !value || value.startsWith('--')) throw new Error('Usage: node scripts/audit-internal-links.mjs [--out out] [--report .artifacts/internal-links.json]');
    options[flag] = value;
  }
  const report = await auditInternalLinks(path.resolve(options['--out']));
  const reportFile = path.resolve(options['--report']);
  await mkdir(path.dirname(reportFile), { recursive: true });
  await writeFile(reportFile, `${JSON.stringify(report, null, 2)}\n`);
  const { summary } = report;
  console.log(`Internal links: ${summary.sitemapPages} sitemap pages; ${summary.brokenLinks} broken links; ${summary.redirectLinks} redirect links; ${summary.unreachablePages} unreachable pages; maximum homepage depth ${summary.maxCrawlDepth}.`);
  console.log(`Homepage depth distribution: ${JSON.stringify(summary.depthHistogram)}`);
  console.log(`Lowest body inlinks: ${report.leastBodyInlinks.map((page) => `${page.path} (${page.bodyInlinks})`).join(', ')}`);
  for (const error of report.sitemapErrors) console.error(`Sitemap: ${error}`);
  for (const link of report.brokenLinks) console.error(`Broken: ${link.source} -> ${link.href} (${link.reason})`);
  for (const link of report.redirectLinks) console.warn(`Redirect: ${link.source} -> ${link.href} (${link.chain.join('; ')})`);
  console.log(`Report: ${reportFile}`);
  if (summary.brokenLinks || summary.sitemapErrors) process.exitCode = 1;
}
