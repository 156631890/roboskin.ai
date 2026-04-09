import Link from 'next/link';
import { footerNavigation, site } from '@/content/site';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-cyan-300/15 bg-[#02101f]">
      <div className="container-shell py-14">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/40 bg-gradient-to-br from-cyan-400/30 to-blue-500/25 shadow-[0_10px_26px_rgba(16,115,196,0.45)]">
                <svg className="h-6 w-6 text-cyan-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0-4a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
              <div>
                <p className="text-xl font-bold tracking-tight text-white">{site.name}</p>
                <p className="text-[11px] tracking-[0.16em] text-cyan-100/70">TACTILE SYSTEMS</p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-slate-300">
              Tactile sensor skin and integration support for robotics teams, OEM programs, and research deployments.
            </p>
            <div className="mt-6 space-y-2 text-sm text-slate-300">
              <p>
                Email: <a className="text-cyan-300 hover:text-cyan-200" href={`mailto:${site.contact.primaryEmail}`}>{site.contact.primaryEmail}</a>
              </p>
              <p>
                Sales: <a className="text-cyan-300 hover:text-cyan-200" href={`mailto:${site.contact.salesEmail}`}>{site.contact.salesEmail}</a>
              </p>
            </div>
          </div>

          {footerNavigation.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-cyan-100/70">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-300 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cyan-300/15 pt-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>Copyright {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Built for robotics teams that need dependable tactile perception.</p>
        </div>
      </div>
    </footer>
  );
}
