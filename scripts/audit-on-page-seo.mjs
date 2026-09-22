import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import domino from '@mixmark-io/domino';

const origin = 'https://roboskin.ai';
const cleanPath = (value) => new URL(value, origin).pathname.replace(/\/$/, '') || '/';
const normalizeText = (value) => value.replace(/\s+/g, ' ').trim();
const canonicalIdentity = (value) => new URL(value, origin).href.replace(/\/$/, '');

// Parse the exported document, never the duplicated Next.js hydration payload.
// Domino builds a DOM without executing scripts or requesting subresources.
export function inspectPage(html, pathname) {
  const document = domino.createDocument(html);
  const main = document.querySelector('main') ?? document.body;
  const links = Array.from(main.querySelectorAll('a[href]')).map((link) => ({
    href: link.getAttribute('href'),
    text: normalizeText(link.textContent),
  }));
  const ids = Array.from(document.querySelectorAll('[id]')).map((node) => node.id);
  for (const node of Array.from(main.querySelectorAll('script, style, nav'))) node.parentNode.removeChild(node);
  const title = document.querySelector('title')?.textContent ?? '';
  const description = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '';
  return {
    path: pathname, title: normalizeText(title), description: normalizeText(description), canonical,
    h1: Array.from(document.querySelectorAll('h1')).map((heading) => normalizeText(heading.textContent)),
    titleCount: document.querySelectorAll('title').length,
    descriptionCount: document.querySelectorAll('meta[name="description"]').length,
    canonicalCount: document.querySelectorAll('link[rel="canonical"]').length,
    robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '',
    // A diagnostic only: word count is not a ranking score or a minimum requirement.
    bodyWords: normalizeText(main.textContent).split(/\s+/).filter(Boolean).length,
    links,
    ids,
  };
}

export function validatePages(pages, sitemapPaths, assetPaths = new Set(), redirects = {}) {
  const errors = [];
  const warnings = [];
  const records = [];
  const titleOwners = new Map();
  const descriptionOwners = new Map();
  const inbound = new Map(sitemapPaths.map((pathname) => [pathname, new Set()]));
  const sitemapSet = new Set(sitemapPaths);
  if (sitemapSet.size !== sitemapPaths.length) errors.push('Sitemap contains duplicate page URLs');

  for (const pathname of sitemapPaths) {
    const page = pages.get(pathname);
    if (!page) { errors.push(`${pathname}: sitemap page has no exported HTML`); continue; }
    if (redirects[pathname]) errors.push(`${pathname}: redirect is listed in sitemap`);
    if (page.titleCount !== 1 || !page.title) errors.push(`${pathname}: expected one nonempty title`);
    if (page.descriptionCount !== 1 || !page.description) errors.push(`${pathname}: expected one nonempty description`);
    if (page.h1.length !== 1 || !page.h1[0]) errors.push(`${pathname}: expected one nonempty H1`);
    if (/\bnoindex\b/i.test(page.robots)) errors.push(`${pathname}: sitemap page is noindex`);
    try {
      if (page.canonicalCount !== 1 || !page.canonical || canonicalIdentity(page.canonical) !== canonicalIdentity(pathname)) {
        errors.push(`${pathname}: canonical does not identify this page`);
      }
    } catch { errors.push(`${pathname}: invalid canonical URL`); }

    for (const [value, owners, label] of [[page.title, titleOwners, 'title'], [page.description, descriptionOwners, 'description']]) {
      const normalized = value.toLowerCase();
      if (owners.has(normalized)) errors.push(`${pathname}: duplicate ${label} with ${owners.get(normalized)}`);
      else if (value) owners.set(normalized, pathname);
    }

    const destinations = new Set();
    for (const link of page.links) {
      let url;
      try { url = new URL(link.href, `${origin}${pathname}`); } catch { continue; }
      if (url.origin !== origin) continue;
      const targetPath = cleanPath(url.href);
      const target = pages.get(targetPath);
      if (redirects[targetPath]) {
        warnings.push(`${pathname}: link uses redirect ${targetPath} -> ${redirects[targetPath]}`);
        continue;
      }
      if (!target && !assetPaths.has(targetPath) && !targetPath.startsWith('/api/')) {
        errors.push(`${pathname}: broken internal link ${link.href}`);
      }
      if (target && url.hash && !url.search) {
        let fragment;
        try { fragment = decodeURIComponent(url.hash.slice(1)); } catch { fragment = url.hash.slice(1); }
        if (!fragment.startsWith(':~:text=') && !target.ids.includes(fragment)) errors.push(`${pathname}: missing anchor ${link.href}`);
      }
      if (target && targetPath !== pathname) {
        destinations.add(targetPath);
        inbound.get(targetPath)?.add(pathname);
      }
    }
    records.push({ path: pathname, title: page.title, description: page.description, h1: page.h1[0], bodyWords: page.bodyWords, linkedPages: destinations.size });
  }
  for (const record of records) record.bodyInlinks = inbound.get(record.path)?.size ?? 0;
  return { pages: records, errors: [...new Set(errors)], warnings: [...new Set(warnings)] };
}

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory()
    ? listFiles(path.join(directory, entry.name))
    : [path.join(directory, entry.name)]))).flat();
}

export async function auditExport(directory) {
  const files = await listFiles(directory);
  const pages = new Map();
  const assets = new Set();
  for (const file of files) {
    const relative = path.relative(directory, file).split(path.sep).join('/');
    assets.add(`/${relative}`);
    if (!relative.endsWith('.html')) continue;
    const pathname = relative === 'index.html' ? '/' : `/${relative.replace(/(?:\/index)?\.html$/, '')}`;
    pages.set(pathname, inspectPage(await readFile(file, 'utf8'), pathname));
  }
  const sitemap = await readFile(path.join(directory, 'sitemap.xml'), 'utf8');
  const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => cleanPath(match[1]));
  const redirects = JSON.parse(await readFile(new URL('../config/protected-redirects.json', import.meta.url), 'utf8'));
  return validatePages(pages, sitemapPaths, assets, redirects);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const report = await auditExport(path.resolve('out'));
  const reportIndex = process.argv.indexOf('--report');
  if (reportIndex >= 0) {
    if (!process.argv[reportIndex + 1]) throw new Error('--report requires a file path');
    await writeFile(process.argv[reportIndex + 1], `${JSON.stringify(report, null, 2)}\n`);
  }
  for (const warning of report.warnings) console.warn(`SEO review: ${warning}`);
  if (report.errors.length) {
    for (const error of report.errors) console.error(`SEO failure: ${error}`);
    process.exitCode = 1;
  } else {
    console.log(`On-page SEO verified: ${report.pages.length} sitemap pages; unique titles/descriptions, H1s, canonicals, and internal destinations/anchors.`);
  }
}
