import type { Metadata } from 'next';
import { faqItems, productCards, site } from '@/content/site';

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
    title: 'Robot Skin and Tactile AI for Humanoid Robots',
    description:
      'RoboSkin.ai builds tactile AI, humanoid robot skin, e-skin, and tactile sensing components for robot hands, grippers, pilots, and integration teams.',
    priority: 1,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home'],
  },
  '/products': {
    path: '/products',
    title: 'Robot Skin Products and Tactile Sensor Modules',
    description:
      'Explore RoboSkin tactile sensor modules, developer kits, and custom robot skin programs for robotic grippers, humanoid robots, and e-skin pilots.',
    priority: 0.9,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'Products'],
  },
  '/solutions': {
    path: '/solutions',
    title: 'Tactile Sensing Solutions for Robot Hands and Grippers',
    description:
      'Explore RoboSkin solution paths for robotic grippers, humanoid robot skin, prosthetics, medical robotics, and research teams evaluating tactile AI.',
    priority: 0.9,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'Solutions'],
  },
  '/technology': {
    path: '/technology',
    title: 'Tactile AI Technology for Flexible Robot Skin',
    description:
      'Understand RoboSkin sensing layers, signal processing, form-factor design, and integration support for flexible tactile robot skin systems.',
    priority: 0.85,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'Technology'],
  },
  '/resources': {
    path: '/resources',
    title: 'Robot Skin Datasheets, SDKs, and Technical Briefs',
    description:
      'Request RoboSkin datasheets, integration notes, SDK access, ROS compatibility details, and technical briefs for tactile sensing evaluations.',
    priority: 0.8,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'Resources'],
  },
  '/downloads': {
    path: '/downloads',
    title: 'Request RoboSkin Downloads and Technical Material',
    description:
      'Request RoboSkin datasheets, developer kit notes, integration docs, SDK access, and benchmark methodology for robot skin evaluation.',
    priority: 0.75,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'Downloads'],
  },
  '/comparison': {
    path: '/comparison',
    title: 'Compare RoboSkin Sensor Array, Developer Kit, and Custom Program',
    description:
      'Compare RoboSkin offer levels and choose the right starting point for tactile sensor evaluation, robot skin integration, or custom form factors.',
    priority: 0.8,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'Comparison'],
  },
  '/implementation': {
    path: '/implementation',
    title: 'Robot Skin Evaluation, Pilot, and Deployment Path',
    description:
      'Understand the RoboSkin path from tactile sensing evaluation to prototype, pilot, and deployment for robot hands and curved surfaces.',
    priority: 0.75,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'Implementation'],
  },
  '/faq': {
    path: '/faq',
    title: 'Robot Skin FAQ: Tactile AI, e-skin, and Integration Questions',
    description:
      'Practical answers about robot skin, tactile AI, e-skin, datasheets, ROS compatibility, integration reviews, and request-only technical material.',
    priority: 0.8,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'FAQ'],
  },
  '/about': {
    path: '/about',
    title: 'About RoboSkin.ai',
    description:
      'Learn what RoboSkin builds, how the team works with robotics companies, and how to request technical material or an integration review.',
    priority: 0.7,
    changeFrequency: 'monthly',
    index: true,
    breadcrumbs: ['Home', 'About'],
  },
  '/contact': {
    path: '/contact',
    title: 'Contact RoboSkin for Datasheets and Integration Support',
    description:
      'Talk to the RoboSkin team about tactile sensor demos, humanoid robot skin datasheets, developer kits, and integration support.',
    priority: 0.8,
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
    description: 'Terms of use for the RoboSkin website and request flows.',
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
  'e-skin',
  'robotics',
  'robotic grippers',
  'tactile sensing',
  'robot hands',
  'developer kit',
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
          url: '/og-image.jpg',
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
      images: ['/twitter-image.jpg'],
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
    description: 'Tactile AI and robot skin components for robotics teams evaluating humanoid robot skin, e-skin, and tactile sensing.',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: site.contact.salesEmail,
        availableLanguage: ['en'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'technical support',
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

export function buildProductListJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${site.url}/products#product-list`,
    name: 'RoboSkin tactile sensing products',
    itemListElement: productCards.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.summary,
        category: 'Tactile sensing and robot skin hardware',
        brand: {
          '@type': 'Brand',
          name: site.name,
        },
        url: `${site.url}/products`,
      },
    })),
  };
}

export function buildFaqJsonLd(items = faqItems) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${site.url}/faq#faq`,
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

export function buildGraphJsonLd(items: unknown[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': items,
  };
}

export const sitemapLastModified = updatedAt;
