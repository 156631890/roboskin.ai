import Link from 'next/link';
import { footerNavigation, site } from '@/content/site';

export default function Footer() {
  return (
    <footer className="surface-shell-strong mt-auto border-t">
      <div className="container-shell py-14">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-10 w-10 grid-cols-4 gap-0.5 rounded-xl border border-white/10 bg-[var(--bg-soft)] p-2 shadow-[0_16px_34px_rgba(0,12,28,0.42)]" aria-hidden="true">
                {Array.from({ length: 16 }).map((_, index) => {
                  const active = [2, 6, 9, 10, 13, 14].includes(index);
                  return <span key={index} className={(active ? 'bg-[var(--secondary)]' : 'bg-[#d1e7ff]/35') + ' rounded-[2px]'} />;
                })}
              </div>
              <div>
                <p className="text-xl font-bold tracking-tight text-[var(--text)]">{site.name}</p>
                <p className="text-[11px] tracking-[0.16em] text-soft">TACTILE AI</p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-soft">
              Robot skin and tactile AI information hub with source-backed research notes, glossary definitions, and conservative application context.
            </p>
            <div className="mt-6 space-y-2 text-sm text-soft">
              <p>
                Research notes:{' '}
                <Link className="text-accent hover:text-[#0f766e]" href={site.domainInquiry.href}>
                  {site.domainInquiry.ctaLabel}
                </Link>
              </p>
              <p>
                Email: <a className="text-accent hover:text-[#0f766e]" href={`mailto:${site.contact.primaryEmail}`}>{site.contact.primaryEmail}</a>
              </p>
              <p>
                WhatsApp: <a className="text-accent hover:text-[#0f766e]" href={`https://wa.me/${site.contact.whatsappDial}`} target="_blank" rel="noreferrer">{site.contact.whatsapp}</a>
              </p>
              <p>
                WeChat: <span className="text-[var(--text)]">{site.contact.wechat}</span>
              </p>
              <p>
                Privacy: <a className="text-accent hover:text-[#0f766e]" href={`mailto:${site.contact.privacyEmail}`}>{site.contact.privacyEmail}</a>
              </p>
            </div>
          </div>

          {footerNavigation.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-soft">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-soft transition-colors hover:text-[var(--text)]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--panel-border)] pt-6 text-xs text-soft md:flex-row md:items-center md:justify-between">
          <p>Copyright {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Built as a robotics information resource with conservative claim standards.</p>
        </div>
      </div>
    </footer>
  );
}

