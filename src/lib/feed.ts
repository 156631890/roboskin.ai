import { blogPosts } from '@/lib/blog-data';
import { newsPosts } from '@/lib/news-data';
import { canonicalUrl } from '@/lib/seo';

const xmlEscape = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

export function buildRssFeed(): string {
  const items = [
    ...blogPosts.map((post) => ({ ...post, path: `/research/${post.id}` })),
    ...newsPosts.map((post) => ({ ...post, path: `/news/${post.id}` })),
  ].sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime());

  const itemXml = items.map((item) => {
    const url = canonicalUrl(item.path);
    return `<item><title>${xmlEscape(item.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${xmlEscape(item.excerpt)}</description><pubDate>${new Date(item.date).toUTCString()}</pubDate></item>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>RoboSkin.ai Research and News</title><link>${canonicalUrl('/')}</link><description>Source-backed robot skin, tactile AI, and electronic skin research.</description><language>en</language>${itemXml}</channel></rss>`;
}
