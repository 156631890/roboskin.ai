import { site } from '@/content/site';
import { getRecentNewsPosts } from '@/lib/news-sitemap';
import { canonicalUrl } from '@/lib/seo';

export const dynamic = 'force-static';

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function GET() {
  const entries = getRecentNewsPosts()
    .map(
      (post) => `<url>
  <loc>${escapeXml(canonicalUrl(`/news/${post.id}`))}</loc>
  <news:news>
    <news:publication>
      <news:name>${escapeXml(site.name)}</news:name>
      <news:language>en</news:language>
    </news:publication>
    <news:publication_date>${post.date}</news:publication_date>
    <news:title>${escapeXml(post.title)}</news:title>
  </news:news>
</url>`,
    )
    .join('');

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' +
    'xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">' +
    entries +
    '</urlset>';

  return new Response(xml, {
    headers: { 'content-type': 'application/xml; charset=utf-8' },
  });
}
