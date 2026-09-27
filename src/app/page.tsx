import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import ResearchResourceActions from '@/components/ResearchResourceActions';
import AiRobotClosedLoop from '@/components/AiRobotClosedLoop';
import { AuthorityIndex, DirectAnswerSection } from '@/components/IndustryVisuals';
import {
  authorityLinkGroups, directAnswerBlocks, homeBrandAssets, homeAiRobotLoop,
  homeKnowledgeMap, homeResearchWatch, homeRoboticsIntelligence,
} from '@/content/site';
import { blogPosts } from '@/lib/blog-data';
import { newsPosts } from '@/lib/news-data';
import { researchIndexEntries } from '@/lib/research-index';
import { tactileBenchmarkEntries } from '@/lib/tactile-benchmarks';
import { tactileDatasetEntries } from '@/lib/tactile-datasets';
import { tactileSensorEntries } from '@/lib/tactile-sensors';
import {
  buildBreadcrumbJsonLd, buildFaqJsonLd, buildGraphJsonLd,
  buildHomePhysicalAiRoutesJsonLd, buildPageJsonLd, buildPageMetadata,
  buildPhysicalAiDefinedTermJsonLd,
} from '@/lib/seo';

const homeRobotSkinFaq = directAnswerBlocks.slice(0, 3).map((item) => ({
  question: item.question, answer: item.answer, href: item.href, ctaLabel: item.ctaLabel,
}));

const homeAuthorityLinkGroups = authorityLinkGroups.map((group) => ({
  ...group,
  links: group.links.slice(0, group.title === 'Track the field' ? 5 : 4),
}));

const latestResearchSignals = [
  ...blogPosts.map((post) => ({ ...post, href: `/research/${post.id}`, label: 'Research brief' })),
  ...newsPosts.map((post) => ({ ...post, href: `/news/${post.id}`, label: 'Robotics news' })),
].sort((left, right) => right.date.localeCompare(left.date)).slice(0, 3);

const researchDatabases = [
  { label: 'Research records', count: researchIndexEntries.length, detail: 'Papers & technical evidence', href: '/research-index' },
  { label: 'Datasets', count: tactileDatasetEntries.length, detail: 'Source-reviewed records', href: '/datasets' },
  { label: 'Sensors', count: tactileSensorEntries.length, detail: 'Tactile sensing systems', href: '/sensors' },
  { label: 'Benchmarks', count: tactileBenchmarkEntries.length, detail: 'Evaluation suites', href: '/benchmarks' },
];

export const metadata: Metadata = buildPageMetadata('/');

export default function Home() {
  return (
    <div className="robo-home">
      <JsonLd data={buildGraphJsonLd([
        buildPageJsonLd('/'), buildBreadcrumbJsonLd('/'), buildFaqJsonLd(homeRobotSkinFaq, '/'),
        buildPhysicalAiDefinedTermJsonLd(), buildHomePhysicalAiRoutesJsonLd(),
      ])} />

      <section className="contact-hero" aria-labelledby="home-heading">
        <div className="container-shell">
          <div className="contact-hero-topline">
            <span><i aria-hidden="true" /> Source-backed robotics research map</span>
            <span>Robot skin / Tactile AI / Physical AI</span>
          </div>
          <div className="contact-hero-stage">
            <div className="contact-hero-art">
              <Image src={homeBrandAssets.hero.image} alt={homeBrandAssets.hero.imageAlt}
                fill priority sizes="(max-width: 700px) 100vw, (min-width: 1480px) 960px, 72vw" />
              <span className="contact-hero-coordinate" aria-hidden="true">01 / The contact layer</span>
            </div>
            <div className="contact-hero-copy">
              <p className="eyebrow">Intelligence, in contact.</p>
              <h1 id="home-heading" aria-label="Robot skin and tactile AI for Physical AI and humanoid robots">
                Robot skin <span className="hero-emphasis">and tactile AI</span>
                <span className="contact-hero-context">for Physical AI <span className="block sm:inline">and humanoid robots</span></span>
              </h1>
            </div>
            <div className="contact-hero-body">
              <p className="contact-hero-deck">The contact layer of intelligent machines.</p>
              <p className="contact-hero-description">Explore source-backed robotics research across robot skin, tactile sensors, robot hands, and Physical AI. Find the papers. Understand the evidence.</p>
              <div className="contact-hero-actions">
                <Link href="/research-index#research-explorer" className="btn-primary">Compare research evidence <span aria-hidden="true">↗</span></Link>
                <a href="#latest-research" className="contact-text-link">Latest research <span aria-hidden="true">↓</span></a>
              </div>
            </div>
            <p className="contact-hero-caption">Touch study 01 <span>AI-generated concept · not an experimental image</span></p>
          </div>
          <nav className="contact-database-strip" aria-label="RoboSkin research databases">
            {researchDatabases.map((item) => (
              <Link key={item.href} href={item.href}>
                <span className="contact-database-count">{String(item.count).padStart(2, '0')}</span>
                <span><strong>{item.label}</strong><small>{item.detail}</small></span>
                <span className="contact-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section id="latest-research" className="contact-section contact-dispatch-section" aria-labelledby="latest-heading">
        <div className="container-shell">
          <div className="contact-section-heading">
            <div><p className="quiet-label">01 / Research dispatch</p><h2 id="latest-heading">At the edge of touch.</h2></div>
            <div className="contact-section-aside"><p>Newest robotics research briefs</p><Link href="/news">All news <span aria-hidden="true">↗</span></Link><Link href="/research">Browse research briefs <span aria-hidden="true">↗</span></Link></div>
          </div>
          <div className="contact-dispatches">
            {latestResearchSignals.map((signal, index) => (
              <article key={signal.href} className="contact-dispatch" data-lead={index === 0 ? 'true' : undefined}>
                <div className="contact-dispatch-meta"><span>{signal.label}</span><time dateTime={signal.date}>{signal.date}</time></div>
                <h3><Link href={signal.href}>{signal.title}</Link></h3>
                <p>{signal.excerpt}</p>
                {index === 0 && signal.image ? (
                  <Link href={signal.href} className="contact-dispatch-image" aria-label={`View illustration and sources: ${signal.title}`}>
                    <Image src={signal.image} alt="" fill sizes="(max-width: 800px) 100vw, 46vw" />
                  </Link>
                ) : null}
                <div className="contact-dispatch-foot"><span>{signal.technicalFocus[0]}</span><Link href={signal.href} aria-label={`Read: ${signal.title}`}>Read brief <span aria-hidden="true">↗</span></Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-field" aria-labelledby="field-heading">
        <div className="container-shell contact-section">
          <div className="contact-section-heading">
            <div><p className="quiet-label">02 / Explore the field</p><h2 id="field-heading">From surface to intelligence.</h2></div>
            <p className="contact-heading-description">Robot Skin → Tactile AI → Physical AI<br />Choose a starting point. Follow the evidence.</p>
          </div>
          <div className="contact-field-grid">
            <div className="contact-field-intro">
              <figure className="contact-material">
                <Image src="/generated/brand/roboskin-material-cyber-v3.webp"
                  alt="Concept rendering of flexible tactile sensing layers with fine conductors and a sensor matrix."
                  fill sizes="(max-width: 800px) 100vw, 40vw" />
                <figcaption>Material study 02 / AI-generated concept</figcaption>
              </figure>
              <h3>What is robot skin?</h3>
              <p>Robot skin detects contact, pressure, shear and slip across hands, grippers and body surfaces. It gives robots information about physical interaction that vision alone cannot provide.</p>
              <Link href="/robot-skin" className="contact-text-link">Start with the fundamentals <span aria-hidden="true">↗</span></Link>
            </div>
            <nav className="contact-field-routes" aria-label="Core research topics">
              {homeKnowledgeMap.map((item, index) => (
                <Link key={item.title} href={item.href ?? '/research'}>
                  <span className="contact-route-number">{String(index + 1).padStart(2, '0')}</span>
                  <span><strong>{item.title}</strong><small>{item.description}</small></span>
                  <span className="contact-arrow" aria-hidden="true">↗</span>
                </Link>
              ))}
            </nav>
          </div>
          <nav className="home-topic-rail" aria-label="Robotics intelligence topics">
            {homeRoboticsIntelligence.map((topic, index) => (
              <Link key={topic.href} href={topic.href ?? '/research'}><span>{String(index + 1).padStart(2, '0')}</span><strong>{topic.title}</strong><small aria-hidden="true">↗</small></Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="contact-section container-shell" aria-labelledby="working-paper-heading">
        <div className="contact-paper">
          <div className="contact-paper-index"><p className="quiet-label">RoboSkin Working Papers</p><span aria-hidden="true">WP—01</span><Link href="/papers">All working papers ↗</Link></div>
          <div className="contact-paper-copy"><p className="contact-paper-status">Research in progress / Version 0.2</p><h2 id="working-paper-heading">Interaction as<br />the Interface.</h2><p>When should a robot probe before acting? Explore our research proposal and its synthetic decision benchmark.</p><p className="contact-paper-boundary">Not peer reviewed · No physical-robot evaluation</p><Link href="/papers/interaction-as-the-interface" className="contact-text-link">Explore the proposal <span aria-hidden="true">↗</span></Link></div>
          <ol className="contact-paper-method" aria-label="Working paper materials"><li><span>01</span><strong>Read the proposal</strong><small>Versioned manuscript</small></li><li><span>02</span><strong>Inspect the experiment</strong><small>Synthetic decision benchmark</small></li><li><span>03</span><strong>Check the boundaries</strong><small>Methods & limitations</small></li></ol>
        </div>
      </section>

      <section className="contact-section contact-directory container-shell" aria-labelledby="directory-heading">
        <div className="contact-section-heading"><div><p className="quiet-label">03 / Research desk</p><h2 id="directory-heading">Go a layer deeper.</h2></div><Link href="/resources" className="contact-text-link">View RoboSkin library <span aria-hidden="true">↗</span></Link></div>
        <div className="contact-tool-row">
          <div><span className="quiet-label">Hands-on learning</span><h3>Build with touch data.</h3><p>Start with a Python tactile-data exercise. Then explore ROS 2 messages, calibration and replay.</p></div>
          <Link href="/robotics-programming" className="btn-secondary">Open the learning path <span aria-hidden="true">↗</span></Link>
        </div>
        <details className="contact-fold">
          <summary><span>01</span><h3>How AI becomes robot action</h3><span className="contact-fold-icon" aria-hidden="true" /></summary>
          <div className="contact-fold-body"><p className="section-copy">Artificial intelligence supplies perception, prediction, reasoning, and action policies. Robotics supplies the sensors, controllers and physical feedback.</p><Link href="/ai-robotics" className="contact-text-link">Open the AI and robotics field guide ↗</Link><AiRobotClosedLoop stages={homeAiRobotLoop} /></div>
        </details>
        <details className="contact-fold">
          <summary><span>02</span><h3>Find the right robot skin research route</h3><span className="contact-fold-icon" aria-hidden="true" /></summary>
          <div className="contact-fold-body"><AuthorityIndex groups={homeAuthorityLinkGroups} /><nav className="contact-utility-links" aria-label="Research utilities"><Link href="/glossary">Open the glossary ↗</Link><Link href="/technology">Explore tactile AI technology ↗</Link><Link href="/research-index">Search the research index ↗</Link><Link href="/contact?requestType=research">Submit source ↗</Link></nav></div>
        </details>
        <details className="contact-fold">
          <summary><span>03</span><h3>Physical AI needs robot skin, tactile AI, and contact feedback</h3><span className="contact-fold-icon" aria-hidden="true" /></summary>
          <div className="contact-fold-body"><p className="section-copy">In the RoboSkin context, Physical AI means physical-world AI systems that use sensing, reasoning and control to act. Touch connects those actions to contact, pressure and slip.</p><nav className="contact-utility-links" aria-label="Physical AI reading routes"><Link href="/physical-ai">Read Physical AI ↗</Link><Link href="/guides/tactile-feedback-for-physical-ai">Map tactile feedback ↗</Link><Link href="/physical-ai-touch">Trace touch data ↗</Link><Link href="/applications">Explore humanoid robot skin use cases ↗</Link></nav></div>
        </details>
        <details className="contact-fold">
          <summary><span>04</span><h3>Robotics research pulse</h3><span className="contact-fold-icon" aria-hidden="true" /></summary>
          <div className="contact-fold-body contact-watch"><div><p className="quiet-label">Track humanoid robots, Physical AI, embodied AI, and robot manipulation</p><h4>{homeResearchWatch.title}</h4><p>{homeResearchWatch.summary}</p><p>{homeResearchWatch.relevance}</p><small>Reviewed {homeResearchWatch.reviewedAt} · Source date {homeResearchWatch.sourceDate}</small></div><div className="contact-utility-links"><a href={homeResearchWatch.sourceUrl} target="_blank" rel="noreferrer">{homeResearchWatch.sourceLabel} ↗</a><Link href={homeResearchWatch.reviewUrl}>{homeResearchWatch.reviewLabel} ↗</Link></div></div>
        </details>
        <details className="contact-fold">
          <summary><span>05</span><h3>Short answers to common robot skin and tactile AI questions</h3><span className="contact-fold-icon" aria-hidden="true" /></summary>
          <div className="contact-fold-body"><DirectAnswerSection answers={homeRobotSkinFaq} /><Link href="/faq" className="contact-text-link">More questions & answers ↗</Link></div>
        </details>
        <ResearchResourceActions context="home" />
        <div className="contact-editorial-note"><p>Independent research. Traceable sources. Clear limitations.</p><Link href="/editorial-policy">Our editorial standards ↗</Link><Link href="/contact?requestType=research">Submit research context ↗</Link></div>
      </section>
    </div>
  );
}
