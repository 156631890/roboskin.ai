import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://roboskin.ai';

  const routes = [
    '',
    '/technology',
    '/applications',
    '/research',
    '/contact',
    '/team',
    '/careers',
    '/faq',
    '/privacy'
  ];

  const staticPages = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Research blog posts
  const researchPosts = [
    'neuromorphic-tactile-2026',
    'graphene-quantum-tunneling',
    'self-healing-2025',
    'multimodal-sensing-2025',
    'bio-integration-2025',
    'scalable-manufacturing-2025',
    'ai-tactile-learning-2025',
    'extreme-environment-2025'
  ].map((id) => ({
    url: `${baseUrl}/research/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...researchPosts];
}
