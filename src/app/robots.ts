import { MetadataRoute } from 'next';
import { getRecentNewsPosts } from '@/lib/news-sitemap';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const hasRecentNews = getRecentNewsPosts().length > 0;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/', '/domain-sale.html'],
      },
    ],
    sitemap: [
      'https://roboskin.ai/sitemap.xml',
      ...(hasRecentNews ? ['https://roboskin.ai/news-sitemap.xml'] : []),
    ],
  };
}
