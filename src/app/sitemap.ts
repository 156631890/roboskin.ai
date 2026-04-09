import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://roboskin.ai';

  const routes = [
    '',
    '/products',
    '/solutions',
    '/technology',
    '/resources',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ];

  const staticPages = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return staticPages;
}
