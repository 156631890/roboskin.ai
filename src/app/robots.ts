import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/', '/domain-sale.html'],
      },
    ],
    sitemap: 'https://roboskin.ai/sitemap.xml',
  };
}
