import Link from 'next/link';
import { footerNavigation, site } from '@/content/site';
import NewsletterSignup from '@/components/NewsletterSignup';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-shell">
        <div className="site-footer-lead">
          <div>
            <p className="site-footer-index">RoboSkin.ai / Independent research index</p>
            <h2>Touch is the missing layer of physical intelligence.</h2>
          </div>
          <Link href="/contact?requestType=research" className="site-footer-contribute">
            Contribute a source <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="site-footer-grid">
          <div className="site-footer-about">
            <Link href="/" className="site-footer-wordmark" aria-label="RoboSkin.ai home">
              RoboSkin<span>.ai</span>
            </Link>
            <p>
              Source-backed robot skin, tactile AI, humanoid robotics, and Physical AI research—organized for engineers,
              researchers, and evidence-seeking readers.
            </p>
            <div className="site-footer-contact">
              <a href={`mailto:${site.contact.primaryEmail}`}>{site.contact.primaryEmail}</a>
              <a href={`https://wa.me/${site.contact.whatsappDial}`} target="_blank" rel="noreferrer">
                WhatsApp {site.contact.whatsapp}
              </a>
              <span>WeChat {site.contact.wechat}</span>
            </div>
          </div>

          <nav className="site-footer-navigation" aria-label="Footer navigation">
            {footerNavigation.map((column) => (
              <div key={column.title} className="site-footer-column">
                <h3>{column.title}</h3>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <NewsletterSignup />

        <div className="site-footer-base">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p>Evidence first. Claims stay inside their sources.</p>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
