'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { primaryNavigation } from '@/content/site';

const desktopNavigation = primaryNavigation.filter(({ href }) => href !== '/' && href !== '/about');

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      {Array.from({ length: 9 }).map((_, index) => (
        <span key={index} data-active={[1, 4, 7].includes(index) ? 'true' : undefined} />
      ))}
    </span>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMobileMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const closeAboveMobileBreakpoint = () => {
      if (window.innerWidth > 1100) setMobileMenuOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('resize', closeAboveMobileBreakpoint);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('resize', closeAboveMobileBreakpoint);
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <div className="container-shell">
        <div className="site-nav-inner">
          <Link href="/" className="site-logo" aria-label="RoboSkin.ai home">
            <BrandMark />
            <span className="site-wordmark">
              RoboSkin<span>.ai</span>
            </span>
          </Link>

          <div className="site-nav-links">
            {desktopNavigation.map((link) => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(`${link.href}/`));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="site-nav-link"
                  data-active={active ? 'true' : undefined}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="site-nav-actions">
            <Link href="/contact?requestType=research" className="site-nav-cta">
              Submit source <span aria-hidden="true">↗</span>
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="site-menu-button"
            >
              <span aria-hidden="true" className="site-menu-icon" data-open={mobileMenuOpen ? 'true' : undefined}>
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div id="mobile-navigation" className="site-mobile-menu">
          <div className="container-shell">
            <p className="site-mobile-label">Explore RoboSkin.ai</p>
            <div className="site-mobile-links">
              {primaryNavigation.map((link, index) => {
                const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(`${link.href}/`));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="site-mobile-link"
                    data-active={active ? 'true' : undefined}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <Link
              href="/contact?requestType=research"
              onClick={() => setMobileMenuOpen(false)}
              className="site-mobile-cta"
            >
              Contribute a research source <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
