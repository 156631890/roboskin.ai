import { MetadataRoute } from 'next';
import { seoTopicPages } from '@/content/seo-topic-pages';
import { pageVisuals } from '@/content/site';
import { blogPosts } from '@/lib/blog-data';
import { newsPosts } from '@/lib/news-data';
import { canonicalUrl, seoRoutes, sitemapLastModified } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = seoRoutes
    .filter((route) => route.index)
    .map((route) => ({
      url: canonicalUrl(route.path),
      lastModified: new Date(route.updated ?? sitemapLastModified),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }));

  const articlePages = blogPosts.map((post) => ({
    url: canonicalUrl(`/research/${post.id}`),
    lastModified: new Date(post.updated),
    changeFrequency: 'monthly' as const,
    priority: 0.72,
    images: [canonicalUrl(post.image)],
  }));

  const newsPages = newsPosts.map((post) => ({
    url: canonicalUrl(`/news/${post.id}`),
    lastModified: new Date(post.updated),
    changeFrequency: 'monthly' as const,
    priority: 0.68,
    images: [canonicalUrl(post.image)],
  }));

  const topicPages = seoTopicPages.map((page) => ({
    url: canonicalUrl(page.path),
    lastModified: new Date(page.updated),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    images: [canonicalUrl(pageVisuals[page.visualKey].image)],
  }));

  return [...staticPages, ...articlePages, ...newsPages, ...topicPages];
}
