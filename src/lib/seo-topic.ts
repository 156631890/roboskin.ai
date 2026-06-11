import type { Metadata } from 'next';
import type { SeoTopicPage } from '@/content/seo-topic-pages';
import { site } from '@/content/site';
import { canonicalUrl } from '@/lib/seo';

export function buildSeoTopicMetadata(page: SeoTopicPage): Metadata {
  const url = canonicalUrl(page.path);

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: page.schemaType === 'TechArticle' ? 'article' : 'website',
      locale: 'en_US',
      url,
      title: `${page.title} | ${site.name}`,
      description: page.description,
      siteName: site.name,
      images: [
        {
          url: '/og-image.svg',
          width: 1200,
          height: 630,
          alt: `${page.title} - ${site.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.title} | ${site.name}`,
      description: page.description,
      images: ['/twitter-image.svg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function buildSeoTopicGraph(page: SeoTopicPage) {
  const url = canonicalUrl(page.path);
  const breadcrumbNames = ['Home', ...page.path.split('/').filter(Boolean).map((part) => part.replaceAll('-', ' '))];
  const mainEntity =
    page.schemaType === 'DefinedTerm'
      ? {
          '@type': 'DefinedTerm',
          name: page.h1,
          description: page.quickAnswer.join(' '),
          url,
          inDefinedTermSet: {
            '@type': 'DefinedTermSet',
            name: 'RoboSkin.ai robot skin glossary',
            url: canonicalUrl('/glossary'),
          },
        }
      : undefined;

  const pageNode = {
    '@context': 'https://schema.org',
    '@type': page.schemaType,
    '@id': `${url}#webpage`,
    url,
    name: page.title,
    headline: page.h1,
    description: page.description,
    datePublished: page.updated,
    dateModified: page.updated,
    inLanguage: 'en',
    isPartOf: {
      '@id': `${site.url}/#website`,
    },
    publisher: {
      '@id': `${site.url}/#organization`,
    },
    mainEntity,
    about: page.keywords,
    citation: page.sources?.map((source) => source.href),
  };

  const breadcrumbNode = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbNames.map((name, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: index === 0 ? canonicalUrl('/') : index === breadcrumbNames.length - 1 ? url : canonicalUrl(`/${page.path.split('/').filter(Boolean).slice(0, index).join('/')}`),
    })),
  };

  const faqNode = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: page.faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [pageNode, breadcrumbNode, faqNode],
  };
}
