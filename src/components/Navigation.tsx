'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { primaryNavigation, site } from '@/content/site';

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="surface-shell sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="container-shell">
        <div className="flex min-h-18 items-center justify-between py-3">
          <div className="flex items-center py-2">
            <Link href="/" className="group flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))] text-[#62a8ff] shadow-[0_12px_24px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-105">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0-4a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold tracking-tight text-white">{site.name}</span>
                <span className="text-[10px] font-semibold tracking-[0.18em] text-soft">TACTILE AI</span>
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
                    ? 'bg-[rgba(98,168,255,0.14)] text-[#d7e7ff] ring-1 ring-[#62a8ff]/35'
                    : 'text-soft hover:bg-white/5 hover:text-white')
                }
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact?requestType=brief&requestedAsset=RoboSkin.ai%20Brief"
              className="ml-2 rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-bold text-white shadow-[0_10px_24px_rgba(98,168,255,0.22)] transition-transform hover:scale-[1.02]"
            >
              Request Brief
            </Link>
          </div>

          <div className="flex items-center py-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="rounded-lg border border-white/8 p-2 text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="surface-shell-strong border-t md:hidden">
          <div className="container-shell space-y-1 py-4">
            {primaryNavigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={
                  'block rounded-lg px-4 py-3 text-sm font-semibold ' +
                  (pathname === link.href ? 'bg-[rgba(98,168,255,0.14)] text-[#d7e7ff]' : 'text-[#aab3c2] hover:bg-white/5')
                }
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact?requestType=brief&requestedAsset=RoboSkin.ai%20Brief"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 block rounded-lg bg-[var(--primary)] px-4 py-3 text-center text-sm font-bold text-white"
            >
              Request Brief
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
