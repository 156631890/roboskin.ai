import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-data';
import { canonicalUrl, seoRoutes } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = seoRoutes
    .filter((route) => route.index)
    .map((route) => ({
      url: canonicalUrl(route.path),
      lastModified: new Date('2026-04-25'),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }));

  const articlePages = blogPosts.map((post) => ({
    url: canonicalUrl(`/research/${post.id}`),
    lastModified: new Date(post.updated),
    changeFrequency: 'monthly' as const,
    priority: 0.72,
  }));

  return [...staticPages, ...articlePages];
}
