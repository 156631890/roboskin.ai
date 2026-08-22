import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
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

export async function generateAgentMarkdown(outputRoot = path.join(projectRoot, 'out')) {
  const htmlFiles = await listHtmlFiles(outputRoot);
  const markdownRoot = path.join(outputRoot, '_agent-markdown');

  for (const htmlFile of htmlFiles) {
    const relativeHtml = path.relative(outputRoot, htmlFile);
    const relativeMarkdown = markdownRelativePathForHtml(relativeHtml);
    const outputFile = path.resolve(markdownRoot, relativeMarkdown);
    if (!outputFile.startsWith(`${path.resolve(markdownRoot)}${path.sep}`)) {
      throw new Error(`Refusing to write outside the agent Markdown directory: ${relativeMarkdown}`);
    }
    const html = await readFile(htmlFile, 'utf8');
    const markdown = htmlToMarkdown(html, pathnameForHtml(relativeHtml));
    await mkdir(path.dirname(outputFile), { recursive: true });
    await writeFile(outputFile, markdown, 'utf8');
  }

  return { count: htmlFiles.length, outputRoot: markdownRoot };
}

const executablePath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : '';
if (import.meta.url === executablePath) {
  const result = await generateAgentMarkdown();
  console.log(`Generated ${result.count} agent Markdown representations in ${result.outputRoot}`);
}
