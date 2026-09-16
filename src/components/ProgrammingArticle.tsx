import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import JsonLd from '@/components/JsonLd';
import CodeBlock from '@/components/CodeBlock';
import type { ProgrammingPage } from '@/content/programming-pages';
import { site } from '@/content/site';
import { buildSeoTopicGraph } from '@/lib/seo-topic';
import { canonicalUrl } from '@/lib/seo';
import './programming.css';

export default function ProgrammingArticle({ page, children }: { page: ProgrammingPage; children?: ReactNode }) {
  const breadcrumbs = [
    { href: '/', label: 'Home' },
    { href: '/resources', label: 'Resources' },
    ...(page.path === '/robotics-programming' ? [] : [{ href: '/robotics-programming', label: 'Programming' }]),
    { href: page.path, label: page.path === '/robotics-programming' ? 'Robotics programming' : page.kicker },
  ];
  const graph = buildSeoTopicGraph(page);
  const structuredData = { ...graph, '@graph': graph['@graph'].map(node => node?.['@type'] === 'BreadcrumbList' ? {
    ...node,
    itemListElement: breadcrumbs.map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, name: crumb.label, item: canonicalUrl(crumb.href) })),
  } : node) };
  return (
    <>
      <JsonLd data={structuredData} />
      <article className="tutorial-article container-shell">
        <header className="tutorial-header">
          <nav aria-label="Breadcrumb" className="tutorial-breadcrumb">
            {breadcrumbs.map((crumb, index) => <span key={crumb.href}>{index > 0 && <span aria-hidden="true">/ </span>}{index === breadcrumbs.length - 1 ? <span aria-current="page">{crumb.label}</span> : <Link href={crumb.href}>{crumb.label}</Link>}</span>)}
          </nav>
          <p className="section-label">{page.kicker}</p>
          <h1>{page.h1}</h1>
          <p className="tutorial-deck">{page.description}</p>
          <p className="tutorial-byline">By <Link href={site.editorial.path}>{site.editorial.name}</Link> · {page.published && <>Published <time dateTime={page.published}>{page.published}</time> · </>}Updated <time dateTime={page.updated}>{page.updated}</time></p>
          <div className="tutorial-answer">{page.quickAnswer.map(text => <p key={text}>{text}</p>)}</div>
        </header>
        <div className="tutorial-layout">
          <aside className="tutorial-toc">
            <nav aria-label="On this page">
              <p className="section-label">On this page</p>
              <ol>{page.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.heading}</a></li>)}</ol>
              {children && <a href="#complete-code">Complete Python script</a>}
              <a href="#faq">Common questions</a>
            </nav>
          </aside>
          <div className="tutorial-body">
            <div className="tutorial-verification" role="note"><strong>Verification scope</strong><p>{page.verification}</p></div>
            {page.sections.map(section => (
              <section id={section.id} key={section.id} className="tutorial-section">
                <h2>{section.heading}</h2>
                {section.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && <ul>{section.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>}
                {section.table && (
                  <div className="tutorial-table" tabIndex={0} role="region" aria-label={`${section.heading} table`}>
                    <table>
                      <thead><tr>{section.table.headers.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead>
                      <tbody>{section.table.rows.map((row, index) => <tr key={index}>{row.map((cell, i) => i === 0 ? <th key={i} scope="row">{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody>
                    </table>
                  </div>
                )}
                {section.code?.map(code => <CodeBlock key={code.label} {...code} />)}
                {section.image && <figure><Image src={section.image.src} alt={section.image.alt} width={section.image.width} height={section.image.height} sizes="(max-width: 900px) 100vw, 850px" /><figcaption>{section.image.caption}</figcaption></figure>}
                {section.links && <ul className="tutorial-links">{section.links.map(link => <li key={link.href}>{link.download ? <a href={link.href} download>{link.label} ↓</a> : <Link href={link.href}>{link.label} <span aria-hidden="true">→</span></Link>}</li>)}</ul>}
              </section>
            ))}
            {children}
            <section id="faq" className="tutorial-section"><h2>Common questions</h2>{page.faqs.map(faq => <div key={faq.question} className="tutorial-faq"><h3>{faq.question}</h3><p>{faq.answer}</p></div>)}</section>
            <section className="tutorial-section"><h2>Next steps</h2><ul className="tutorial-links">{page.relatedLinks.map(link => <li key={link.href}><Link href={link.href}>{link.label} →</Link><p>{link.description}</p></li>)}</ul></section>
            <section className="tutorial-section tutorial-sources"><h2>Source references</h2><ul>{page.sources?.map(source => <li key={source.href}><a href={source.href}>{source.label}</a></li>)}</ul></section>
          </div>
        </div>
      </article>
    </>
  );
}
