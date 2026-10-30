import Link from 'next/link';
import site from '../config/site';
import { timeAgo } from '../lib/posts';

export function TagList({ tags, limit = 2 }) {
  const items = (tags || []).filter(Boolean).slice(0, limit);
  if (!items.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <span
          key={t}
          className="rounded-md border border-ink-600 bg-ink-800 px-2 py-0.5 text-[11px] font-medium text-fg-muted"
        >
          #{t}
        </span>
      ))}
    </div>
  );
}

export function CategoryBadge({ category, className = '' }) {
  const meta = site.categories.find((c) => c.slug === category) ?? {
    label: category,
    color: '#5D6A82',
  };
  return (
    <Link
      href={`/category/${category}`}
      className={`inline-flex items-center gap-1.5 rounded-full border border-line bg-ink-850 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${className}`}
      style={{ color: meta.color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: meta.color }} />
      {meta.label}
    </Link>
  );
}

export function Sentiment({ value }) {
  const map = {
    Bullish: 'text-bull border-bull/30 bg-bull/10',
    Cautious: 'text-brand border-brand/30 bg-brand/10',
    Bearish: 'text-bear border-bear/30 bg-bear/10',
    Neutral: 'text-fg-muted border-line bg-ink-800',
  };
  const cls = map[value] || map.Neutral;
  return (
    <span className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-semibold ${cls}`}>
      {value}
    </span>
  );
}

export default function PostCard({ post, compact = false }) {
  return (
    <article className="group flex flex-col rounded-xl border border-line bg-ink-850/72 p-5 shadow-card transition-colors hover:border-ink-600">
      <div className="flex flex-wrap items-center gap-2">
        <CategoryBadge category={post.category} />
        <Sentiment value={post.sentiment} />
        <span className="ml-auto text-xs text-fg-faint">
          {timeAgo(post.date)}
        </span>
      </div>

      <h3 className={`mt-3 font-bold leading-snug text-fg transition-colors group-hover:text-brand-soft ${compact ? 'text-base' : 'text-lg'}`}>
        <Link href={`/posts/${post.slug}`}>
          {post.title}
        </Link>
      </h3>

      {!compact && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-fg-muted">
          {post.summary}
        </p>
      )}

      <div className="mt-4 flex items-center gap-3 border-t border-line/60 pt-3 text-xs text-fg-faint">
        <span className="font-medium text-fg-muted">{post.source}</span>
        <span aria-hidden>·</span>
        <span>{post.readMinutes} min read</span>
        {post.externalUrl ? (
          <a
            href={post.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1 font-semibold text-brand hover:text-brand-soft"
          >
            Read more <span aria-hidden>↗</span>
          </a>
        ) : (
          <Link
            href={`/posts/${post.slug}`}
            className="ml-auto inline-flex items-center gap-1 font-semibold text-brand hover:text-brand-soft"
          >
            Read <span aria-hidden>→</span>
          </Link>
        )}
      </div>
    </article>
  );
}