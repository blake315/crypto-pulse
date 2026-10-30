import Link from 'next/link';
import site from '../config/site';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-ink-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-brand" />
            <span className="text-lg font-bold text-fg">
              Crypto<span className="text-brand">Pulse</span>
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-fg-muted">
            {site.tagline}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-fg">Sections</h3>
          <ul className="mt-3 flex flex-col gap-2">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-fg-muted hover:text-brand-soft">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-fg">Follow</h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-fg-muted">
            <li><span className="hover:text-brand-soft">X (Twitter)</span></li>
            <li><span className="hover:text-brand-soft">Telegram</span></li>
            <li><span className="hover:text-brand-soft">RSS feed</span></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-fg">Media kit</h3>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">
            Interested in a partner slot? Real advertising inventory lives in{' '}
            <code className="rounded bg-ink-800 px-1">lib/partners.js</code> — every
            placement is labelled sponsored.
          </p>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-fg-faint">
        © {new Date().getFullYear()} Crypto Pulse · Information only, not financial advice.
      </div>
    </footer>
  );
}