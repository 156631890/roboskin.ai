import { readFile, writeFile } from 'node:fs/promises';

// Next 15 inserts its own noindex tag for its static not-found response.
// Keep the framework 404 response and recovery UI; express default follow explicitly
// in the generated static/server artifact rather than adding a duplicate metadata tag.
export function normalizeNotFoundHtml(html) {
  let inserted = false;
  const result = html.replace(/<meta\b[^>]*name=["'](?:robots|googlebot)["'][^>]*>/gi, tag => {
    if (!/name=["']robots["']/i.test(tag) || inserted) return '';
    inserted = true;
    return '<meta name="robots" content="noindex, follow"/>';
  }).replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, '');
  if (!inserted) throw new Error('Expected Next.js not-found robots metadata');
  return result;
}

if (process.argv[1]?.replaceAll('\\', '/').endsWith('/normalize-not-found.mjs')) {
  let files = 0;
  for (const file of ['out/404.html', 'out/404/index.html', 'out/_not-found.html', '.next/server/app/_not-found.html']) {
    let html;
    try { html = await readFile(file, 'utf8'); } catch (error) { if (error.code === 'ENOENT') continue; throw error; }
    await writeFile(file, normalizeNotFoundHtml(html));
    console.log(`Normalized 404 indexing metadata: ${file}`);
    files++;
  }
  if (!files) throw new Error('No generated not-found artifact found');
}
