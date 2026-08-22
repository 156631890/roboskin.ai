import Link from 'next/link';

const recoveryRoutes = [
  { href: '/research-index', label: 'Research index', detail: 'Structured robot-skin and tactile-AI evidence records.' },
  { href: '/glossary', label: 'Robotics glossary', detail: 'Definitions for robot skin, tactile AI, and Physical AI.' },
  { href: '/llms.txt', label: 'LLM guide', detail: 'Compact machine-readable site guidance.' },
  { href: '/llms-full.txt', label: 'Full LLM context', detail: 'Extended research and entity context.' },
  { href: '/sitemap.xml', label: 'XML sitemap', detail: 'Canonical crawlable URLs.' },
];

export default function NotFound() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-shell">
        <p className="eyebrow">404 / Agent recovery</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-bold text-[var(--text)] md:text-6xl">Page not found</h1>
        <p className="mt-5 max-w-2xl text-soft">
          RoboSkin.ai could not find this route. Use a canonical research, terminology, or machine-readable index below instead of retrying guessed URLs.
        </p>
        <div className="mt-9 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {recoveryRoutes.map((route) => (
            <Link key={route.href} href={route.href} className="glass-card p-5 transition-colors hover:border-white/20">
              <span className="block text-base font-semibold text-white">{route.label}</span>
              <span className="mt-2 block text-sm leading-relaxed text-soft">{route.detail}</span>
              <code className="mt-4 block text-xs text-accent">{route.href}</code>
            </Link>
          ))}
        </div>
        <Link href="/" className="btn-primary mt-9 inline-flex">Return to RoboSkin.ai</Link>
      </div>
    </section>
  );
}
