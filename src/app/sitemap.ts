import { MetadataRoute } from 'next';
import { seoTopicPages } from '@/content/seo-topic-pages';
import { blogPosts } from '@/lib/blog-data';
import { canonicalUrl, seoRoutes, sitemapLastModified } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = seoRoutes
    .filter((route) => route.index)
    .map((route) => ({
      url: canonicalUrl(route.path),
      lastModified: new Date(sitemapLastModified),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }));

  const articlePages = blogPosts.map((post) => ({
    url: canonicalUrl(`/research/${post.id}`),
    lastModified: new Date(post.updated),
    changeFrequency: 'monthly' as const,
    priority: 0.72,
  }));

  const topicPages = seoTopicPages.map((page) => ({
    url: canonicalUrl(page.path),
    lastModified: new Date(page.updated),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  return [...staticPages, ...articlePages, ...topicPages];
}
