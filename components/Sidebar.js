import Link from 'next/link';
import AdSlot from './AdSlot';
import { getTrendingPosts, timeAgo } from '../lib/posts';
import { getTickers } from '../lib/market';
import site from '../config/site';

export default function Sidebar() {
  const trending = getTrendingPosts(5);
  const tickers = getTickers();

  return (
    <div className="flex flex-col gap-5">
      {/* Sponsored box — rectangle */}
      <AdSlot position="rectangle" />

      {/* Market pulse */}
      <section className="rounded-xl border border-line bg-ink-850/72 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold tracking-tight text-fg">Market pulse</h2>
          <Link href="/" className="text-xs text-brand hover:text-brand-soft">View all</Link>
        </div>
        <ul className="mt-3 divide-y divide-line/60">
          {tickers.coins.slice(0, 6).map((c) => {
            const up = c.change >= 0;
            return (
              <li key={c.symbol} className="flex items-center justify-between py-2 text-sm">
                <span className="font-medium text-fg">{c.symbol}</span>
                <span className="text-fg-muted">${c.price.toLocaleString()}</span>
                <span className={`w-16 text-right font-mono text-xs ${up ? 'text-bull' : 'text-bear'}`}>
                  {up ? '+' : ''}{c.change.toFixed(2)}%
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Hot picks */}
      {trending.length > 0 && (
        <section className="rounded-xl border border-line bg-ink-850/72 p-5">
          <h2 className="text-sm font-bold tracking-tight text-fg">Top picks</h2>
          <ul className="mt-3 flex flex-col gap-3">
            {trending.map((p) => (
              <li key={p.slug} className="group">
                <Link href={`/posts/${p.slug}`} className="block">
                  <span className="text-xs text-fg-faint">{timeAgo(p.date)}</span>
                  <span className="block text-sm font-medium leading-snug text-fg-muted line-clamp-2 group-hover:text-brand-soft">
                    {p.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Categories */}
      <section className="rounded-xl border border-line bg-ink-850/72 p-5">
        <h2 className="text-sm font-bold tracking-tight text-fg">Browse</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {site.categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/category/${c.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-ink-800 px-3 py-1.5 text-xs font-medium text-fg-muted transition-colors hover:border-ink-600 hover:text-fg"
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.color }} />
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* About strip — pages can be extended later */}
      <section className="rounded-xl border border-dashed border-ink-600 bg-ink-900/60 p-5 text-sm leading-relaxed text-fg-muted">
        <h2 className="text-sm font-bold text-fg">About this hub</h2>
        <p className="mt-2">
          Curated crypto briefs and exchange intel. No login, no paywall. Snapshot data
          updates with each publish; treat it as a reference, not a live feed.
        </p>
      </section>
    </div>
  );
}