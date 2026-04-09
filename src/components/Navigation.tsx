'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { primaryNavigation, site } from '@/content/site';

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-[#d9d3c8] bg-[rgba(246,244,239,0.86)] backdrop-blur-md">
      <div className="container-shell">
        <div className="flex min-h-18 items-center justify-between py-3">
          <div className="flex items-center py-2">
            <Link href="/" className="group flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d9d3c8] bg-white text-[#2e5bff] shadow-[0_8px_18px_rgba(17,19,24,0.06)] transition-transform duration-300 group-hover:scale-105">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0-4a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold tracking-tight text-[#111318]">{site.name}</span>
                <span className="text-[10px] font-semibold tracking-[0.18em] text-[#61656f]">TACTILE SYSTEMS</span>
              </div>
            </Link>
          </div>

          <div className="hidden items-center gap-1 md:flex">
            {primaryNavigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  'rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ' +
                  (pathname === link.href
                    ? 'bg-[#dde6ff] text-[#2446c8] ring-1 ring-[#c8d5ff]'
                    : 'text-[#3d424d] hover:bg-white hover:text-[#111318]')
                }
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-2 rounded-xl bg-[#2e5bff] px-4 py-2 text-sm font-bold text-white shadow-[0_8px_20px_rgba(46,91,255,0.18)] transition-transform hover:scale-[1.02]"
            >
              Talk to engineering
            </Link>
          </div>

          <div className="flex items-center py-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg border border-[#d9d3c8] p-2 text-[#111318]"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-[#d9d3c8] bg-[rgba(246,244,239,0.98)] md:hidden">
          <div className="container-shell space-y-1 py-4">
            {primaryNavigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={
                  'block rounded-lg px-4 py-3 text-sm font-semibold ' +
                  (pathname === link.href ? 'bg-[#dde6ff] text-[#2446c8]' : 'text-[#3d424d] hover:bg-white')
                }
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 block rounded-lg bg-[#2e5bff] px-4 py-3 text-center text-sm font-bold text-white"
            >
              Talk to engineering
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
