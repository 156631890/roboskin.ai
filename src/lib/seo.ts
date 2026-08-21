import type { Metadata } from 'next';
import { faqItems, productCards, site } from '@/content/site';
import type { BlogPost } from '@/lib/blog-data';
import type { NewsPost } from '@/lib/news-data';
import type { ResearchIndexEntry } from '@/lib/research-index';
import type { TactileBenchmarkEntry } from '@/lib/tactile-benchmarks';
import type { TactileDatasetEntry } from '@/lib/tactile-datasets';
import type { TactileSensorEntry } from '@/lib/tactile-sensors';

export type SeoRoute = {
  path: string;
  title: string;
  description: string;
  updated?: string;
  priority: number;
  changeFrequency: 'weekly' | 'monthly';
  index: boolean;
  breadcrumbs: string[];
};

const updatedAt = '2026-07-10';

export const pageSeo: Record<string, SeoRoute> = {
  '/': {
    path: '/',
    title: 'Robot Skin, Tactile AI & Robotics Research',
    description:
      'Research robot skin, tactile AI, humanoid robots, robot learning, VLA models, tactile sensors, datasets, and Physical AI with primary-source citations.',
    updated: '2026-08-20',
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
  '/physical-ai': {
    path: '/physical-ai',
    title: 'Physical AI: Models, Robots & Real-World Action',
    description:
      'Physical AI connects multimodal perception, reasoning, robot policies, control, embodiment, safety, and measured feedback. Map the full system and its tactile contact layer.',
    updated: '2026-08-21',
    priority: 0.92,
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
    index: false,
    breadcrumbs: ['Home', 'References'],
  },
  '/comparison': {
    path: '/comparison',
    title: 'Compare Robot Skin Category Concepts and Learning Routes',
    description:
      'Compare robot skin category concepts, tactile sensing terminology, and possible RoboSkin.ai guide routes for robotics and AI content.',
    priority: 0.8,
    changeFrequency: 'weekly',
    index: false,
    breadcrumbs: ['Home', 'Comparison'],
  },
  '/implementation': {
    path: '/implementation',
    title: 'Robot Skin Category Roadmap and Research Paths',
    description:
      'Understand educational evaluation concepts for tactile sensing, robot hands, curved surfaces, and research discovery without integration-support claims.',
    priority: 0.75,
    changeFrequency: 'weekly',
    index: false,
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
    title: 'Robot Skin and Tactile Sensing Research',
    description:
      'Read robot hand tactile sensor research, slip detection robot hand briefs, e-skin notes, multimodal sensing, and ROS 2 tactile pipelines.',
    priority: 0.78,
    changeFrequency: 'weekly',
    index: true,
    breadcrumbs: ['Home', 'Research'],
  },
  '/research-index': {
    path: '/research-index',
    title: 'RoboSkin Tactile Research Index: Sensors, Data, and Evidence',
    description:
      'Compare source-backed robot skin and tactile AI research by sensing principle, modalities, form factor, data output, evidence level, and limitations.',
    updated: '2026-08-15',
    priority: 0.82,
    changeFrequency: 'monthly',
    index: true,
    breadcrumbs: ['Home', 'Research Index'],
  },
  '/organizations': {
    path: '/organizations',
    title: 'Robot AI Research Organizations and Labs',
    description:
      'Browse source-verified universities, research labs, and companies connected to robot AI models, with official pages, model links, and evidence boundaries.',
    updated: '2026-08-22',
    priority: 0.78,
    changeFrequency: 'monthly',
    index: true,
    breadcrumbs: ['Home', 'Organizations'],
  },
  '/robots': {
    path: '/robots',
    title: 'Robot Platforms for Physical AI Models and Research',
    description:
      'Compare source-verified humanoids, robot arms, mobile manipulators, and research setups used to train, evaluate, or demonstrate robot AI models.',
    updated: '2026-08-22',
    priority: 0.8,
    changeFrequency: 'monthly',
    index: true,
    breadcrumbs: ['Home', 'Robots'],
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
    index: false,
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
    title: 'Robot Skin, Tactile AI and Physical AI News',
    description:
      'Follow source-backed news on robot skin, tactile AI, electronic skin, tactile sensors, dexterous manipulation, and touch for Physical AI.',
    priority: 0.72,
    changeFrequency: 'weekly',
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
  '/research-services': {
    path: '/research-services',
    title: 'Tactile AI and Robot Skin Research Services',
    description:
      'Commission a fixed-scope RoboSkin Research Sprint for source-backed tactile sensors, datasets, robot hands, humanoid touch, companies, and model intelligence.',
    updated: '2026-08-17',
    priority: 0.86,
    changeFrequency: 'monthly',
    index: true,
    breadcrumbs: ['Home', 'Research Services'],
  },
  '/reports/tactile-ai-robot-skin-landscape-2026': {
    path: '/reports/tactile-ai-robot-skin-landscape-2026',
    title: 'Tactile AI and Robot Skin Landscape Report 2026',
    description:
      'Download a free source-backed sample report on tactile AI, robot skin, tactile robotics datasets, research signals, and evaluation questions.',
    updated: '2026-08-17',
    priority: 0.75,
    changeFrequency: 'monthly',
    index: true,
    breadcrumbs: ['Home', 'Sample Report'],
  },
  '/privacy': {
    path: '/privacy',
    title: 'Privacy Policy',
    description: 'How RoboSkin handles contact form submissions and site usage data.',
    updated: '2026-08-21',
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
  'AI in robotics',
  'robot AI',
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
          follow: true,
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
    description: site.description,
    founder: {
      '@id': `${canonicalUrl('/about')}#steven-yang`,
    },
    logo: {
      '@type': 'ImageObject',
      '@id': `${site.url}/#logo`,
      url: canonicalUrl(site.editorial.logo),
      width: 180,
      height: 180,
    },
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

export function buildEditorialLeadJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${canonicalUrl('/about')}#steven-yang`,
    name: site.editorial.lead.name,
    jobTitle: site.editorial.lead.role,
    url: canonicalUrl(site.editorial.lead.path),
    worksFor: {
      '@id': `${site.url}/#organization`,
    },
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
    dateModified: route.updated ?? updatedAt,
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
  const url = canonicalUrl('/physical-ai');

  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `${url}#defined-term`,
    name: 'Physical AI',
    alternateName: ['physical-world artificial intelligence'],
    url,
    description:
      'A broad term for AI systems that perceive, reason, and act through physical machines using sensors, models, policies, control, actuation, safety, and measured feedback.',
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
      'AI in robotics',
      'robot AI',
      'embodied AI',
      'robot learning',
      'robot policy',
      'robot control',
      'physical-world AI',
    ],
  };
}

export function buildHomePhysicalAiRoutesJsonLd() {
  const homeUrl = canonicalUrl('/');
  const routes = [
    {
      name: 'Physical AI canonical answer',
      url: canonicalUrl('/physical-ai'),
      description: pageSeo['/physical-ai'].description,
    },
    {
      name: 'Tactile feedback for Physical AI',
      url: canonicalUrl('/guides/tactile-feedback-for-physical-ai'),
      description: 'Guide route for Physical AI tactile feedback, contact feedback, and robot skin sensing loops.',
    },
    {
      name: 'Physical AI touch data',
      url: canonicalUrl('/physical-ai-touch'),
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
    {
      name: 'Tactile robotics datasets',
      url: canonicalUrl('/datasets'),
      description: 'Filter tactile datasets by sensor, robot, task, modality, and year with source-reviewed access and license fields.',
    },
    {
      name: 'Tactile foundation models',
      url: canonicalUrl('/tactile-foundation-models'),
      description: 'Compare tactile representations, world models, policies, and transfer evidence.',
    },
    {
      name: 'Humanoid robot skin',
      url: canonicalUrl('/humanoid-robot-skin'),
      description: 'Application route for humanoid robots, dexterous hands, tactile coverage, slip, and contact feedback.',
    },
    {
      name: 'Humanoid robots',
      url: canonicalUrl('/humanoid-robots'),
      description: 'Broad research route for humanoid embodiment, whole-body control, robot hands, manipulation, safety, and touch.',
    },
    {
      name: 'Robot VLA models',
      url: canonicalUrl('/robot-vla-models'),
      description: 'Definition and comparison route for vision-language-action policies, robot action interfaces, embodied-reasoning boundaries, and tactile VLA systems.',
    },
    {
      name: 'Robot foundation models',
      url: canonicalUrl('/robot-foundation-models'),
      description: 'Source-reviewed model directory for model roles, training data, embodiments, access, tactile input, and evidence limitations.',
    },
    {
      name: 'Robot learning',
      url: canonicalUrl('/robot-learning'),
      description: 'Definition and research route for imitation learning, reinforcement learning, robot datasets, sim-to-real transfer, and tactile feedback.',
    },
    {
      name: 'Robot hands',
      url: canonicalUrl('/robot-hands'),
      description: 'Comparison route for dexterous robot hands, grippers, actuation, tactile sensing, and manipulation evidence.',
    },
    {
      name: 'Robot safety',
      url: canonicalUrl('/robot-safety'),
      description: 'Scope-aware route for industrial robot safety standards, contact sensing, collision response, and evidence boundaries.',
    },
    {
      name: 'Robotics datasets',
      url: canonicalUrl('/robotics-datasets'),
      description: 'Broad robot-learning dataset route organized by embodiment, observations, actions, tasks, access, and license evidence.',
    },
    {
      name: 'Robot world models',
      url: canonicalUrl('/robot-world-models'),
      description: 'Research route distinguishing predictive robot world models, world-action models, VLA systems, and tactile prediction.',
    },
    {
      name: 'Robot teleoperation',
      url: canonicalUrl('/robot-teleoperation'),
      description: 'Technical route from operator interfaces and synchronized demonstrations to robot-learning data and evaluation.',
    },
    {
      name: 'Robot manipulation',
      url: canonicalUrl('/robot-manipulation'),
      description: 'Broad task route for grasping, dexterous manipulation, insertion, robot learning, control, and tactile feedback.',
    },
    {
      name: 'Tactile sensors for robot manipulation',
      url: canonicalUrl('/guides/tactile-sensor-benchmark-robot-manipulation'),
      description: 'Task-first comparison route for tactile sensors used in contact-rich robot manipulation.',
    },
    {
      name: 'Visuo-tactile world models',
      url: canonicalUrl('/guides/visuo-tactile-world-models-robot-manipulation'),
      description: 'Research route for VLA context, world-action models, contact prediction, and robot planning evidence.',
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${homeUrl}#physical-ai-route-map`,
    name: 'Physical AI and humanoid robotics route map on RoboSkin.ai',
    description:
      'Homepage research map connecting Physical AI, embodied AI, humanoid robots, robot manipulation, robot skin, tactile AI, contact feedback, and world models.',
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

export function buildEditorialTeamJsonLd(authorName = site.editorial.name) {
  return {
    '@type': 'Organization',
    '@id': `${canonicalUrl(site.editorial.path)}#editorial-team`,
    name: authorName,
    url: canonicalUrl(site.editorial.path),
  };
}

export function buildArticleJsonLd(post: BlogPost) {
  const url = canonicalUrl(`/research/${post.id}`);

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
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
    author: buildEditorialTeamJsonLd(post.author),
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
    author: buildEditorialTeamJsonLd(post.author),
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

export function buildResearchIndexJsonLd(entries: ResearchIndexEntry[]) {
  const pageUrl = canonicalUrl('/research-index');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Dataset',
        '@id': `${pageUrl}#dataset`,
        name: 'RoboSkin Tactile Research Index',
        description: 'A source-backed index of robot skin, tactile sensing, tactile AI, and integration research reviewed by RoboSkin.ai.',
        url: pageUrl,
        creator: { '@id': `${canonicalUrl(site.editorial.path)}#editorial-team` },
        dateModified: pageSeo['/research-index'].updated ?? updatedAt,
        inLanguage: 'en',
        isAccessibleForFree: true,
        distribution: [
          { '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: canonicalUrl('/research-index.csv') },
          { '@type': 'DataDownload', encodingFormat: 'application/json', contentUrl: canonicalUrl('/research-index.json') },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#items`,
        numberOfItems: entries.length,
        itemListElement: entries.map((entry, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: entry.url,
          name: entry.title,
        })),
      },
      buildEditorialTeamJsonLd(),
    ],
  };
}

export function buildTactileDatasetsJsonLd(entries: TactileDatasetEntry[]) {
  const pageUrl = canonicalUrl('/datasets');
  const datasetNodes = entries.map((entry) => ({
    '@type': 'Dataset',
    '@id': `${pageUrl}#dataset-${entry.id}`,
    name: entry.name,
    description: `${entry.sampleCount}. Tasks: ${entry.tasks.join(', ')}. ${entry.availability}`,
    url: entry.datasetUrl ?? entry.projectUrl ?? entry.paperUrl,
    creator: entry.institution.map((name) => ({ '@type': 'Organization', name })),
    dateModified: entry.sourceReviewed,
    measurementTechnique: entry.sensor,
    variableMeasured: entry.modalities,
    keywords: entry.tasks,
    citation: entry.paperUrl,
    conditionsOfAccess: entry.availability,
    ...(entry.licenseUrl ? { license: entry.licenseUrl } : {}),
    ...(entry.datasetUrl ? { isAccessibleForFree: true } : {}),
    includedInDataCatalog: {
      '@id': `${pageUrl}#catalog`,
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'DataCatalog',
        '@id': `${pageUrl}#catalog`,
        name: 'RoboSkin.ai Tactile Robotics Dataset Directory',
        description: 'A source-reviewed directory of tactile and visuo-tactile datasets for robot learning, manipulation, and representation research.',
        url: pageUrl,
        dataset: datasetNodes.map((entry) => ({ '@id': entry['@id'] })),
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#dataset-list`,
        numberOfItems: entries.length,
        itemListElement: datasetNodes.map((entry, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: { '@id': entry['@id'] },
        })),
      },
      ...datasetNodes,
    ],
  };
}

export function buildTactileBenchmarksJsonLd(entries: TactileBenchmarkEntry[]) {
  const pageUrl = canonicalUrl('/benchmarks');

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${pageUrl}#benchmark-list`,
    name: 'RoboSkin.ai Tactile Robotics Benchmark Directory',
    description: 'A source-reviewed directory of tactile perception, representation, and manipulation benchmarks.',
    url: pageUrl,
    numberOfItems: entries.length,
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        '@id': `${pageUrl}#benchmark-${entry.id}`,
        name: entry.name,
        description: `${entry.benchmarkType}. ${entry.protocol} Evidence boundary: ${entry.limitation}`,
        url: entry.projectUrl ?? entry.paperUrl,
        datePublished: String(entry.year),
        dateModified: entry.sourceReviewed,
        creator: entry.institutions.map((name) => ({ '@type': 'Organization', name })),
        keywords: [...entry.tasks, ...entry.modalities],
        citation: entry.paperUrl,
        isAccessibleForFree: true,
      },
    })),
  };
}

export function buildTactileSensorsJsonLd(entries: TactileSensorEntry[]) {
  const pageUrl = canonicalUrl('/sensors');

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${pageUrl}#sensor-list`,
    name: 'RoboSkin.ai Tactile Sensor Directory',
    description: 'A source-reviewed comparison of tactile sensors used in robot hands, grippers, skins, and manipulation research.',
    url: pageUrl,
    numberOfItems: entries.length,
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Thing',
        '@id': `${pageUrl}#sensor-${entry.id}`,
        name: entry.name,
        description: `${entry.principle}; ${entry.formFactor}. ${entry.evidenceBoundary}`,
        url: entry.projectUrl ?? entry.sourceUrl,
        sameAs: [entry.sourceUrl, entry.projectUrl, entry.codeUrl].filter(Boolean),
        additionalProperty: [
          { '@type': 'PropertyValue', name: 'Sensing principle', value: entry.principle },
          { '@type': 'PropertyValue', name: 'Form factor', value: entry.formFactor },
          { '@type': 'PropertyValue', name: 'Reported signals', value: entry.signals.join(', ') },
          { '@type': 'PropertyValue', name: 'Reported rate', value: entry.reportedRate },
        ],
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
