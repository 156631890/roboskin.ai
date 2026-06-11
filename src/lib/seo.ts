import type { Metadata } from 'next';
import { faqItems, productCards, site } from '@/content/site';
import type { BlogPost } from '@/lib/blog-data';

export type SeoRoute = {
  path: string;
  title: string;
  description: string;
  priority: number;
  changeFrequency: 'weekly' | 'monthly';
  index: boolean;
  breadcrumbs: string[];
};

const updatedAt = '2026-04-25';

export const pageSeo: Record<string, SeoRoute> = {
  '/': {
    path: '/',
    title: 'Robot Skin, Tactile AI, and E-Skin Authority Portal',
    description:
      'RoboSkin.ai maps robot skin, tactile AI, e-skin, tactile sensing, humanoid robot skin, and contact-aware robotics for physical AI systems.',
    priority: 1,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home'],
  },
  '/products': {
    path: '/products',
    title: 'Robot Skin Category Guides and Tactile AI Learning Routes',
    description:
      'Explore educational category guides for robot skin, tactile AI, e-skin terminology, and possible guide routes for robotics and AI audiences.',
    priority: 0.9,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'Products'],
  },
  '/solutions': {
    path: '/solutions',
    title: 'Tactile Sensing Solutions for Robot Hands and Grippers',
    description:
      'Explore educational context for robotic grippers, humanoid robot skin, prosthetics, medical robotics, and research teams studying tactile AI.',
    priority: 0.9,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'Solutions'],
  },
  '/applications': {
    path: '/applications',
    title: 'Robot Skin Applications and Tactile AI Category Uses',
    description:
      'Explore educational robot skin application areas including humanoid robot skin, tactile AI, e-skin, assistive devices, research media, and category ownership.',
    priority: 0.82,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'Applications'],
  },
  '/technology': {
    path: '/technology',
    title: 'Tactile AI Technology for Flexible Robot Skin',
    description:
      'Understand robot skin sensing layers, signal processing concepts, form-factor design, and tactile AI terminology for flexible robotic skin systems.',
    priority: 0.85,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'Technology'],
  },
  '/physics-ai': {
    path: '/physics-ai',
    title: 'RoboSkin Physics AI: Robot Skin for Physical AI Systems',
    description:
      'RoboSkin.ai explains Physics AI as physical-world AI that needs robot skin, tactile AI, touch, pressure, slip, and contact-aware feedback.',
    priority: 0.86,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'Physics AI'],
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
    breadcrumbs: ['Home', 'Downloads'],
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
    breadcrumbs: ['Home', 'Implementation'],
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
    title: 'Robot Skin Research Notes and Technical Briefs',
    description:
      'Read current RoboSkin research notes on tactile sensing, robotic skin, e-skin, ROS 2 sensor pipelines, multimodal sensing, and dexterous robot hands.',
    priority: 0.78,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'Research'],
  },
  '/glossary': {
    path: '/glossary',
    title: 'Robot Skin Glossary: Tactile AI, E-Skin, and Sensor Terms',
    description:
      'A practical glossary for robot skin, tactile AI, e-skin, slip detection, multimodal sensing, ROS 2 tactile pipelines, and source-backed terminology.',
    priority: 0.72,
    changeFrequency: 'monthly',
    index: true,
    breadcrumbs: ['Home', 'Glossary'],
  },
  '/case-studies': {
    path: '/case-studies',
    title: 'Robot Skin Case Studies and Context Paths',
    description:
      'Anonymous, conservative summaries of robot skin application contexts for grippers, humanoid contact sensing, research interpretation, and category planning.',
    priority: 0.7,
    changeFrequency: 'monthly',
    index: true,
    breadcrumbs: ['Home', 'Case studies'],
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
  'physical AI tactile feedback',
  'Physics AI',
  'Physical AI',
  'RoboSkin Physics AI',
];

export function canonicalUrl(path: string) {
  return `${site.url}${path === '/' ? '' : path}`;
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
      'RoboSkin.ai maps robot skin, tactile AI, e-skin, tactile sensing, and contact-aware robotics for researchers, builders, partners, and research readers.',
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

export function buildCategoryGuideJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${site.url}/products#category-guides`,
    name: 'Robot skin category and guide route guides',
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

export function buildPhysicsAiDefinedTermJsonLd() {
  const url = canonicalUrl('/physics-ai');

  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `${url}#defined-term`,
    name: 'Physics AI',
    alternateName: 'Physical AI',
    url,
    description:
      'In the RoboSkin context, Physics AI means physical-world AI systems that need robot skin, tactile AI, contact feedback, pressure, slip, and tactile sensing. The related industry phrase is often Physical AI.',
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
      'Physics AI',
      'Physical AI',
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

export function buildGraphJsonLd(items: unknown[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': items,
  };
}

export const sitemapLastModified = updatedAt;
