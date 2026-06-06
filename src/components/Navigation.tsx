'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { primaryNavigation, site } from '@/content/site';

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#020408]/86 backdrop-blur-xl">
      <div className="container-shell">
        <div className="flex min-h-18 items-center justify-between py-3">
          <div className="flex items-center py-2">
            <Link href="/" className="group flex items-center gap-3">
              <div className="grid h-10 w-10 grid-cols-4 gap-0.5 rounded-xl border border-white/10 bg-[#070b11] p-2 shadow-[0_16px_34px_rgba(0,12,28,0.42)] transition-transform duration-300 group-hover:scale-105" aria-hidden="true">
                {Array.from({ length: 16 }).map((_, index) => {
                  const active = [2, 6, 9, 10, 13, 14].includes(index);
                  return <span key={index} className={(active ? 'bg-[#00e5ff]' : 'bg-[#d1e7ff]/35') + ' rounded-[2px]'} />;
                })}
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold text-white">{site.name}</span>
                <span className="text-[10px] font-semibold tracking-[0.18em] text-[#7f8b9d]">TACTILE AI</span>
              </div>
            </Link>
          </div>

          <div className="hidden items-center gap-1 md:flex">
            {primaryNavigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  'border-b px-3 py-2 text-sm font-semibold transition-colors duration-200 ' +
                  (pathname === link.href
                    ? 'border-[#00c8ff] text-[#f4f8fb]'
                    : 'border-transparent text-[#97a4b5] hover:border-white/18 hover:text-white')
                }
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact?requestType=research"
              className="ml-2 rounded-xl border border-[#00e5ff]/45 bg-[#00e5ff] px-4 py-2 text-sm font-bold text-[#001018] shadow-[0_14px_28px_rgba(0,229,255,0.18)] transition-transform hover:-translate-y-0.5"
            >
              Suggest Source
            </Link>
          </div>

          <div className="flex items-center py-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-white"
            >
              <span aria-hidden="true" className="grid gap-1.5">
                <span className={mobileMenuOpen ? 'h-px w-6 rotate-45 bg-current transition-transform' : 'h-px w-6 bg-current transition-transform'} />
                <span className={mobileMenuOpen ? 'h-px w-6 -translate-y-[7px] -rotate-45 bg-current transition-transform' : 'h-px w-6 bg-current transition-transform'} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="border-t border-white/10 bg-[#020408] md:hidden">
          <div className="container-shell space-y-1 py-4">
            {primaryNavigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={
                  'block rounded-lg px-4 py-3 text-sm font-semibold ' +
                  (pathname === link.href ? 'bg-[rgba(0,229,255,0.1)] text-[#dff8ff]' : 'text-[#aab3c2] hover:bg-white/5')
                }
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact?requestType=research"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 block rounded-lg bg-[#00e5ff] px-4 py-3 text-center text-sm font-bold text-[#001018]"
            >
              Suggest Source
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
