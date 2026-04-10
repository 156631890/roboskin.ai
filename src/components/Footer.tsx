import Link from 'next/link';
import { footerNavigation, site } from '@/content/site';

export default function Footer() {
  return (
    <footer className="surface-shell-strong mt-auto border-t">
      <div className="container-shell py-14">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))] text-[#62a8ff] shadow-[0_10px_24px_rgba(0,0,0,0.3)]">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0-4a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
              <div>
                <p className="text-xl font-bold tracking-tight text-white">{site.name}</p>
                <p className="text-[11px] tracking-[0.16em] text-soft">TACTILE SYSTEMS</p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-soft">
              Tactile sensor skin and integration support for robotics teams, OEM programs, and research deployments.
            </p>
            <div className="mt-6 space-y-2 text-sm text-soft">
              <p>
                Email: <a className="text-accent hover:text-[#7dd3fc]" href={`mailto:${site.contact.primaryEmail}`}>{site.contact.primaryEmail}</a>
              </p>
              <p>
                Sales: <a className="text-accent hover:text-[#7dd3fc]" href={`mailto:${site.contact.salesEmail}`}>{site.contact.salesEmail}</a>
              </p>
            </div>
          </div>

          {footerNavigation.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-soft">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-soft transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/8 pt-6 text-xs text-soft md:flex-row md:items-center md:justify-between">
          <p>Copyright {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Built for robotics teams that need dependable tactile perception.</p>
        </div>
      </div>
    </footer>
  );
}
