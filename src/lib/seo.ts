import type { Metadata } from 'next';
import { faqItems, productCards, site } from '@/content/site';
import type { BlogPost } from '@/lib/blog-data';
import type { NewsPost } from '@/lib/news-data';

export type SeoRoute = {
  path: string;
  title: string;
  description: string;
  priority: number;
  changeFrequency: 'weekly' | 'monthly';
  index: boolean;
  breadcrumbs: string[];
};

const updatedAt = '2026-06-16';

export const pageSeo: Record<string, SeoRoute> = {
  '/': {
    path: '/',
    title: 'Robot Skin, Tactile AI, and Physical AI Research Map',
    description:
      'RoboSkin.ai tracks robot skin, tactile AI, e-skin, tactile sensing, humanoid robot skin, Physical AI tactile feedback, and contact-aware robotics.',
    priority: 1,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home'],
  },
  '/products': {
    path: '/products',
    title: 'Robot Skin Guides for Tactile AI Learning',
    description:
      'Explore robot skin category guides, tactile AI learning routes, e-skin terminology, and source-backed paths for robotics readers.',
    priority: 0.9,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'Guides'],
  },
  '/solutions': {
    path: '/solutions',
    title: 'Robotic Gripper and Robot Hand Tactile Sensing Use Cases',
    description:
      'Explore educational context for robotic grippers, robot hand tactile sensing, prosthetics, medical robotics, and tactile AI research teams.',
    priority: 0.9,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'Use cases'],
  },
  '/applications': {
    path: '/applications',
    title: 'Humanoid Robot Skin and Contact-Aware Robotics',
    description:
      'Explore humanoid robot skin, contact-aware robotics, tactile AI, e-skin, assistive devices, research media, and category ownership.',
    priority: 0.82,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'Applications'],
  },
  '/technology': {
    path: '/technology',
    title: 'Tactile AI and Flexible Tactile Sensor Technology',
    description:
      'Understand tactile AI, tactile sensing, flexible tactile sensor layers, signal processing, form-factor design, and robot-ready touch signals.',
    priority: 0.85,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'Technology'],
  },
  '/physics-ai': {
    path: '/physics-ai',
    title: 'RoboSkin Physical AI: Robot Skin and Tactile AI',
    description:
      'RoboSkin.ai explains Physical AI as physical-world AI that needs robot skin, tactile AI, touch, pressure, slip, and contact feedback.',
    priority: 0.86,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'Physical AI'],
  },
  '/resources': {
    path: '/resources',
    title: 'Robot Skin Resources and Tactile AI Research Guides',
    description:
      'Browse robot skin resources, tactile AI research guides, terminology routes, and context about the RoboSkin.ai information resource.',
    priority: 0.8,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'Resources'],
  },
  '/downloads': {
    path: '/downloads',
    title: 'Robot Skin Information Resources and References',
    description:
      'Find public information routes, research references, and educational robot skin resources without implied product downloads or hardware availability.',
    priority: 0.75,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'References'],
  },
  '/comparison': {
    path: '/comparison',
    title: 'Compare Robot Skin Category Concepts and Learning Routes',
    description:
      'Compare robot skin category concepts, tactile sensing terminology, and possible RoboSkin.ai guide routes for robotics and AI content.',
    priority: 0.8,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'Comparison'],
  },
  '/implementation': {
    path: '/implementation',
    title: 'Robot Skin Category Roadmap and Research Paths',
    description:
      'Understand educational evaluation concepts for tactile sensing, robot hands, curved surfaces, and research discovery without integration-support claims.',
    priority: 0.75,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'Roadmap'],
  },
  '/faq': {
    path: '/faq',
    title: 'Robot Skin FAQ: Tactile AI, e-skin, and Integration Questions',
    description:
      'Practical answers about robot skin, tactile AI, e-skin, research terminology, research inquiries, and conservative source guidance.',
    priority: 0.8,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'FAQ'],
  },
  '/research': {
    path: '/research',
    title: 'Robot Hand Tactile Sensor and Slip Detection Research',
    description:
      'Read robot hand tactile sensor research, slip detection robot hand briefs, e-skin notes, multimodal sensing, and ROS 2 tactile pipelines.',
    priority: 0.78,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'Research'],
  },
  '/glossary': {
    path: '/glossary',
    title: 'E-Skin Glossary for Robot Skin and Tactile AI Terms',
    description:
      'A practical e-skin and electronic skin glossary for robot skin, tactile AI, tactile sensing, slip detection, and source-backed terminology.',
    priority: 0.72,
    changeFrequency: 'monthly',
    index: true,
    breadcrumbs: ['Home', 'Glossary'],
  },
  '/case-studies': {
    path: '/case-studies',
    title: 'Robot Skin Context Notes and Application Paths',
    description:
      'Anonymous, conservative summaries of robot skin application contexts for grippers, humanoid contact sensing, research interpretation, and category planning.',
    priority: 0.7,
    changeFrequency: 'monthly',
    index: true,
    breadcrumbs: ['Home', 'Context notes'],
  },
  '/about': {
    path: '/about',
    title: 'About RoboSkin.ai',
    description:
      'Learn about RoboSkin.ai as a robot skin information hub and public robot skin information resource for tactile AI audiences.',
    priority: 0.7,
    changeFrequency: 'monthly',
    index: true,
    breadcrumbs: ['Home', 'About'],
  },
  '/editorial-policy': {
    path: '/editorial-policy',
    title: 'RoboSkin Editorial Policy and Source Standards',
    description:
      'Read RoboSkin.ai editorial standards for source-backed robot skin, tactile AI, e-skin, Physical AI, and research-route coverage.',
    priority: 0.68,
    changeFrequency: 'monthly',
    index: true,
    breadcrumbs: ['Home', 'Editorial policy'],
  },
  '/news': {
    path: '/news',
    title: 'RoboSkin News and Site Updates',
    description:
      'Follow RoboSkin.ai site updates, research-route changes, Physical AI coverage, robot skin resources, and tactile AI content improvements.',
    priority: 0.62,
    changeFrequency: 'monthly',
    index: true,
    breadcrumbs: ['Home', 'News'],
  },
  '/contact': {
    path: '/contact',
    title: 'RoboSkin.ai Research Contact',
    description:
      'Contact RoboSkin.ai about source suggestions, corrections, editorial collaboration, or robot skin research information.',
    priority: 0.85,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'Contact'],
  },
  '/privacy': {
    path: '/privacy',
    title: 'Privacy Policy',
    description: 'How RoboSkin handles contact form submissions and site usage data.',
    priority: 0.3,
    changeFrequency: 'monthly',
    index: true,
    breadcrumbs: ['Home', 'Privacy'],
  },
  '/terms': {
    path: '/terms',
    title: 'Terms of Service',
    description: 'Terms of use for the RoboSkin website and research inquiries.',
    priority: 0.3,
    changeFrequency: 'monthly',
    index: true,
    breadcrumbs: ['Home', 'Terms'],
  },
};

export const seoRoutes = Object.values(pageSeo);

const keywords = [
  'robot skin',
  'robotic skin',
  'tactile AI',
  'tactile sensors',
  'humanoid robot skin',
  'robotic skin',
  'e-skin',
  'electronic skin',
  'robotics',
  'robotic grippers',
  'tactile sensing',
  'robot hands',
  'robot skin information hub',
  'robot hand tactile sensor',
  'flexible tactile sensor',
  'slip detection robot hand',
  'Physical AI tactile feedback',
  'Physical AI contact feedback',
  'Physical AI',
  'RoboSkin Physical AI',
  'Physical AI touch data',
  'robot skin for Physical AI',
  'Physics AI',
];

export function canonicalUrl(path: string) {
  return `${site.url}${path === '/' ? '/' : path}`;
}

export function buildPageMetadata(path: keyof typeof pageSeo | string): Metadata {
  const route = pageSeo[path] ?? pageSeo['/'];
  const url = canonicalUrl(route.path);

  return {
    title: route.title,
    description: route.description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      title: `${route.title} | ${site.name}`,
      description: route.description,
      siteName: site.name,
      images: [
        {
          url: '/og-image.svg',
          width: 1200,
          height: 630,
          alt: `${site.name} robot skin and tactile AI`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${route.title} | ${site.name}`,
      description: route.description,
      images: ['/twitter-image.svg'],
    },
    robots: route.index
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        }
      : {
          index: false,
          follow: false,
        },
  };
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    email: site.contact.primaryEmail,
    description:
      'RoboSkin.ai tracks robot skin, tactile AI, e-skin, tactile sensing, contact-aware robotics, and Physical AI context for researchers, engineers, category analysts, and research readers.',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'research inquiry',
        email: site.contact.ownerEmail,
        availableLanguage: ['en'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'content and research inquiry',
        email: site.contact.primaryEmail,
        availableLanguage: ['en'],
      },
    ],
  };
}

export function buildWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: {
      '@id': `${site.url}/#organization`,
    },
    inLanguage: 'en',
    description: pageSeo['/'].description,
  };
}

export function buildPageJsonLd(path: keyof typeof pageSeo | string) {
  const route = pageSeo[path] ?? pageSeo['/'];
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl(route.path)}#webpage`,
    url: canonicalUrl(route.path),
    name: route.title,
    description: route.description,
    isPartOf: {
      '@id': `${site.url}/#website`,
    },
    about: {
      '@id': `${site.url}/#organization`,
    },
    dateModified: updatedAt,
    inLanguage: 'en',
  };
}

export function buildBreadcrumbJsonLd(path: keyof typeof pageSeo | string) {
  const route = pageSeo[path] ?? pageSeo['/'];
  const items = route.breadcrumbs.map((name, index) => {
    const itemPath = index === 0 ? '/' : route.path;

    return {
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: canonicalUrl(itemPath),
    };
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

export function buildResearchArticlePageJsonLd(post: BlogPost) {
  const url = canonicalUrl(`/research/${post.id}`);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: post.title,
    description: post.excerpt,
    isPartOf: {
      '@id': `${site.url}/#website`,
    },
    breadcrumb: {
      '@id': `${url}#breadcrumb`,
    },
    mainEntity: {
      '@id': `${url}#article`,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${site.url}${post.image}`,
    },
    datePublished: post.date,
    dateModified: post.updated,
    inLanguage: 'en',
  };
}

export function buildResearchArticleBreadcrumbJsonLd(post: BlogPost) {
  const url = canonicalUrl(`/research/${post.id}`);

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: canonicalUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Research',
        item: canonicalUrl('/research'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };
}

export function buildNewsArticlePageJsonLd(post: NewsPost) {
  const url = canonicalUrl(`/news/${post.id}`);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: post.title,
    description: post.excerpt,
    isPartOf: {
      '@id': `${site.url}/#website`,
    },
    breadcrumb: {
      '@id': `${url}#breadcrumb`,
    },
    mainEntity: {
      '@id': `${url}#article`,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${site.url}${post.image}`,
    },
    datePublished: post.date,
    dateModified: post.updated,
    inLanguage: 'en',
  };
}

export function buildNewsArticleBreadcrumbJsonLd(post: NewsPost) {
  const url = canonicalUrl(`/news/${post.id}`);

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: canonicalUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'News',
        item: canonicalUrl('/news'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };
}

export function buildCategoryGuideJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${site.url}/products#category-guides`,
    name: 'Robot skin and tactile AI guide routes',
    itemListElement: productCards.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: item.name,
        description: item.summary,
        url: `${site.url}/products`,
      },
    })),
  };
}

export function buildFaqJsonLd(items = faqItems, path = '/faq') {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${canonicalUrl(path)}#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildPhysicalAiDefinedTermJsonLd() {
  const url = canonicalUrl('/physics-ai');

  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `${url}#defined-term`,
    name: 'Physical AI',
    alternateName: ['Physics AI', 'physical-world AI', 'embodied AI'],
    url,
    description:
      'In the RoboSkin context, Physical AI means physical-world AI systems that need robot skin, tactile AI, contact feedback, pressure, slip, and tactile sensing.',
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'RoboSkin robot skin and tactile AI terminology',
      url: canonicalUrl('/glossary'),
    },
    subjectOf: {
      '@id': `${url}#webpage`,
    },
    isPartOf: {
      '@id': `${site.url}/#website`,
    },
    keywords: [
      'Physical AI',
      'RoboSkin Physical AI',
      'Physical AI tactile feedback',
      'Physics AI',
      'robot skin',
      'tactile AI',
      'tactile sensing',
      'e-skin',
      'contact feedback',
      'pressure',
      'slip',
      'physical-world AI',
    ],
  };
}

export function buildHomePhysicalAiRoutesJsonLd() {
  const homeUrl = canonicalUrl('/');
  const routes = [
    {
      name: 'Physical AI canonical answer',
      url: canonicalUrl('/physics-ai'),
      description: pageSeo['/physics-ai'].description,
    },
    {
      name: 'Tactile feedback for Physical AI',
      url: canonicalUrl('/guides/tactile-feedback-for-physical-ai'),
      description: 'Guide route for Physical AI tactile feedback, contact feedback, and robot skin sensing loops.',
    },
    {
      name: 'Physical AI touch data',
      url: canonicalUrl('/guides/physical-ai-touch-data'),
      description: 'Guide route for contact data, tactile logs, and touch signals used by Physical AI systems.',
    },
    {
      name: 'Robot skin for Physical AI',
      url: canonicalUrl('/robot-skin'),
      description: 'Definition route for robot skin as a tactile sensing surface and contact layer.',
    },
    {
      name: 'Tactile AI',
      url: canonicalUrl('/tactile-ai'),
      description: 'Definition route for turning robot touch signals into useful behavior and evaluation data.',
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${homeUrl}#physical-ai-route-map`,
    name: 'Physical AI route map on RoboSkin.ai',
    description:
      'Homepage research map connecting Physical AI, robot skin, tactile AI, contact feedback, touch data, and source-backed research paths.',
    itemListElement: routes.map((route, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'WebPage',
        name: route.name,
        url: route.url,
        description: route.description,
      },
    })),
  };
}

export function buildArticleJsonLd(post: BlogPost) {
  const url = canonicalUrl(`/research/${post.id}`);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    url,
    datePublished: post.date,
    dateModified: post.updated,
    inLanguage: 'en',
    author: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
    publisher: {
      '@id': `${site.url}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
    },
    citation: post.sourceUrl,
    about: post.technicalFocus,
  };
}

export function buildNewsArticleJsonLd(post: NewsPost) {
  const url = canonicalUrl(`/news/${post.id}`);

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    url,
    image: `${site.url}${post.image}`,
    datePublished: post.date,
    dateModified: post.updated,
    inLanguage: 'en',
    isAccessibleForFree: true,
    articleSection: post.category,
    keywords: post.technicalFocus,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: site.url,
    },
    publisher: {
      '@id': `${site.url}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
    },
    citation: post.sources.map((source) => source.url),
    about: post.technicalFocus,
  };
}

export function buildGraphJsonLd(items: unknown[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': items,
  };
}

export const sitemapLastModified = updatedAt;
