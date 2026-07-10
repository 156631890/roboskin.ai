import type { Metadata } from 'next';
import type { SeoTopicPage } from '@/content/seo-topic-pages';
import { pageVisuals, site } from '@/content/site';
import { canonicalUrl } from '@/lib/seo';

export function buildSeoTopicMetadata(page: SeoTopicPage): Metadata {
  const url = canonicalUrl(page.path);

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    authors: [{ name: site.editorial.name, url: canonicalUrl(site.editorial.path) }],
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
  const editorialTeamId = `${canonicalUrl(site.editorial.path)}#editorial-team`;
  const visual = pageVisuals[page.visualKey];
  const breadcrumbNames = ['Home', ...page.path.split('/').filter(Boolean).map((part) => part.replaceAll('-', ' '))];
  const imageNode = {
    '@type': 'ImageObject',
    url: canonicalUrl(visual.image),
    contentUrl: canonicalUrl(visual.image),
    caption: visual.caption,
    description: visual.imageAlt,
  };

  const webPageNode = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: page.title,
    headline: page.h1,
    description: page.description,
    image: imageNode,
    inLanguage: 'en',
    isPartOf: {
      '@id': `${site.url}/#website`,
    },
    publisher: {
      '@id': `${site.url}/#organization`,
    },
    author: {
      '@id': editorialTeamId,
    },
    reviewedBy: {
      '@id': editorialTeamId,
    },
    breadcrumb: {
      '@id': `${url}#breadcrumb`,
    },
    ...(page.schemaType === 'DefinedTerm'
      ? {
          mainEntity: {
            '@id': `${url}#defined-term`,
          },
        }
      : page.schemaType === 'TechArticle'
        ? {
            mainEntity: {
              '@id': `${url}#article`,
            },
          }
        : {}),
    about: page.keywords,
    mentions: page.relatedLinks.map((link) => ({
      '@type': 'WebPage',
      name: link.label,
      url: canonicalUrl(link.href),
      description: link.description,
    })),
    dateModified: page.updated,
  };

  const breadcrumbNode = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
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

  const articleNode = page.schemaType === 'TechArticle'
    ? {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${url}#article`,
        headline: page.h1,
        name: page.title,
        description: page.description,
        image: imageNode,
        url,
        datePublished: page.updated,
        dateModified: page.updated,
        inLanguage: 'en',
        publisher: {
          '@id': `${site.url}/#organization`,
        },
        author: {
          '@id': editorialTeamId,
        },
        reviewedBy: {
          '@id': editorialTeamId,
        },
        mainEntityOfPage: {
          '@id': `${url}#webpage`,
        },
        about: page.keywords,
        mentions: page.relatedLinks.map((link) => ({
          '@type': 'WebPage',
          name: link.label,
          url: canonicalUrl(link.href),
          description: link.description,
        })),
        citation: page.sources?.map((source) => source.href),
      }
    : undefined;

  const definedTermNode = page.schemaType === 'DefinedTerm'
    ? {
        '@context': 'https://schema.org',
        '@type': 'DefinedTerm',
        '@id': `${url}#defined-term`,
        name: page.h1,
        description: page.quickAnswer.join(' '),
        url,
        inDefinedTermSet: {
          '@type': 'DefinedTermSet',
          name: 'RoboSkin.ai robot skin glossary',
          url: canonicalUrl('/glossary'),
        },
        mainEntityOfPage: {
          '@id': `${url}#webpage`,
        },
        isPartOf: {
          '@id': `${site.url}/#website`,
        },
        keywords: page.keywords,
      }
    : undefined;
  const entityNodes = [articleNode, definedTermNode].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@graph': [webPageNode, breadcrumbNode, faqNode, ...entityNodes],
  };
}
