import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import domino from '@mixmark-io/domino';
import TurndownService from 'turndown';
import turndownPluginGfm from 'turndown-plugin-gfm';

const canonicalOrigin = 'https://roboskin.ai';
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { gfm } = turndownPluginGfm;

async function listHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return listHtmlFiles(absolute);
    return entry.isFile() && entry.name.endsWith('.html') ? [absolute] : [];
  }));
  return nested.flat();
}

function pathnameForHtml(relativeHtmlPath) {
  const normalized = relativeHtmlPath.replaceAll('\\', '/');
  if (normalized === 'index.html') return '/';
  if (normalized === '404.html') return '/404';
  if (normalized.endsWith('/index.html')) return `/${normalized.slice(0, -'/index.html'.length)}`;
  return `/${normalized.slice(0, -'.html'.length)}`;
}

const excludedRoute = /^\/(?:api|private|_next|_vercel|_agent-markdown|weekly-reports|account|auth|login|logout)(?:\/|$)/;

export function publicCanonicalPath(html, relativeHtmlPath) {
  const pathname = pathnameForHtml(relativeHtmlPath);
  if (excludedRoute.test(pathname) || /^\/(?:404|500|_not-found)$/.test(pathname)) return null;
  const document = domino.createWindow(html).document;
  const robots = [...document.querySelectorAll('meta[name]')]
    .filter((node) => /^(?:robots|googlebot|bingbot)$/i.test(node.getAttribute('name')))
    .map((node) => node.getAttribute('content') || '');
  if (robots.some((value) => /(?:^|[\s,])(?:noindex|none)(?:$|[\s,])/i.test(value))) return null;
  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
  if (!canonical) return null;
  try {
    const url = new URL(canonical);
    const canonicalPath = url.pathname.replace(/\/$/, '') || '/';
    if (url.origin !== canonicalOrigin || url.search || url.hash || canonicalPath !== pathname) return null;
    return pathname;
  } catch {
    return null;
  }
}

export function markdownRelativePathForHtml(relativeHtmlPath) {
  const normalized = relativeHtmlPath.replaceAll('\\', '/');
  if (normalized === 'index.html') return 'index.md';
  if (normalized.endsWith('/index.html')) return `${normalized.slice(0, -'/index.html'.length)}.md`;
  return `${normalized.slice(0, -'.html'.length)}.md`;
}

function extractMainHtml(html) {
  const main = html.match(/<main\b[^>]*id=["']main-content["'][^>]*>([\s\S]*?)<\/main>/i);
  if (main) return main[1];
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  return body?.[1] ?? html;
}

function absoluteHref(href, pathname) {
  if (!href || /^javascript:/i.test(href)) return null;
  try {
    return new URL(href, new URL(pathname, canonicalOrigin)).href;
  } catch {
    return href;
  }
}

export function htmlToMarkdown(html, pathname) {
  const canonicalUrl = new URL(pathname, canonicalOrigin).href;
  const contentHtml = extractMainHtml(html)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, '')
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, '')
    .replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, '');
  const turndown = new TurndownService({
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    emDelimiter: '*',
    headingStyle: 'atx',
    strongDelimiter: '**',
  });
  turndown.use(gfm);
  turndown.addRule('semanticSpanSpacing', {
    filter: 'span',
    replacement: (content) => content.trim() ? ` ${content.trim()} ` : '',
  });
  turndown.addRule('canonicalLinks', {
    filter: (node) => node.nodeName === 'A' && Boolean(node.getAttribute('href')),
    replacement: (content, node) => {
      const href = absoluteHref(node.getAttribute('href'), pathname);
      const label = content.trim() || node.textContent?.trim() || href || '';
      const separator = node.nextSibling?.nodeName === 'A' ? '\n' : '';
      return href ? `[${label}](${href})${separator}` : label;
    },
  });
  turndown.addRule('canonicalImages', {
    filter: 'img',
    replacement: (_content, node) => {
      const source = absoluteHref(node.getAttribute('src'), pathname);
      if (!source) return '';
      const alt = node.getAttribute('alt')?.trim() || 'RoboSkin.ai visual';
      return `![${alt}](${source})`;
    },
  });

  const body = turndown.turndown(contentHtml)
    .replace(/^(#{1,6})\s+(.+)$/gm, (_match, hashes, heading) => `${hashes} ${heading.replace(/\s+/g, ' ').trim()}`)
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  const header = pathname === '/404'
    ? 'Status: 404 Not Found\nRecovery home: https://roboskin.ai/'
    : `Canonical URL: ${canonicalUrl}`;

  return `${header}\n\n${body}\n`;
}

export async function generateAgentMarkdown(outputRoot = path.join(projectRoot, 'out'), { htmlRoot = outputRoot } = {}) {
  const htmlFiles = await listHtmlFiles(htmlRoot);
  const markdownRoot = path.resolve(outputRoot, '_agent-markdown');
  const records = [];
  for (const htmlFile of htmlFiles) {
    const relativeHtml = path.relative(htmlRoot, htmlFile);
    const relativeMarkdown = markdownRelativePathForHtml(relativeHtml);
    const outputFile = path.resolve(markdownRoot, relativeMarkdown);
    if (!outputFile.startsWith(`${markdownRoot}${path.sep}`)) {
      throw new Error(`Refusing to write outside the agent Markdown directory: ${relativeMarkdown}`);
    }
    const html = await readFile(htmlFile, 'utf8');
    const pathname = publicCanonicalPath(html, relativeHtml);
    if (!pathname) continue;
    records.push({ outputFile, markdown: htmlToMarkdown(html, pathname) });
  }
  if (!records.length) throw new Error(`No public canonical HTML found in ${htmlRoot}; refusing to publish stale Markdown.`);

  // This is a build-owned directory only. Resolve and check its exact location before
  // removing old assets, so removed/noindex pages cannot survive a later build.
  if (path.dirname(markdownRoot) !== path.resolve(outputRoot) || path.basename(markdownRoot) !== '_agent-markdown') {
    throw new Error(`Refusing to clear unexpected Markdown directory: ${markdownRoot}`);
  }
  await rm(markdownRoot, { recursive: true, force: true });
  for (const { outputFile, markdown } of records) {
    await mkdir(path.dirname(outputFile), { recursive: true });
    await writeFile(outputFile, markdown, 'utf8');
  }
  // A fixed recovery document avoids exposing an error page or member-page HTML.
  await writeFile(path.join(markdownRoot, '404.md'), 'Status: 404 Not Found\n\n# Page not found\n\n[Home](https://roboskin.ai/)\n\n[Public sitemap](https://roboskin.ai/sitemap.xml)\n\n[Machine-readable resource index](https://roboskin.ai/llms.txt)\n\n[Expanded knowledge file](https://roboskin.ai/llms-full.txt)\n\n[Research index](https://roboskin.ai/research-index)\n\n[Glossary](https://roboskin.ai/glossary)\n', 'utf8');
  return { count: records.length, outputRoot: markdownRoot };
}

const executablePath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : '';
if (import.meta.url === executablePath) {
  if (process.env.ROBOSKIN_RUNTIME === 'server') {
    const result = await generateAgentMarkdown(path.join(projectRoot, 'public'), {
      htmlRoot: path.join(projectRoot, '.next', 'server', 'app'),
    });
    console.log(`Generated ${result.count} public agent Markdown representations from this server build in ${result.outputRoot}`);
  } else {
    const result = await generateAgentMarkdown();
    console.log(`Generated ${result.count} agent Markdown representations in ${result.outputRoot}`);
  }
}
