'use client';

import site from '../config/site';

export default function CategoryTabs() {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {site.categories.map((c) => (
        <a
          key={c.slug}
          href={`/category/${c.slug}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-ink-850 px-3.5 py-1.5 text-sm font-medium text-fg-muted transition-colors hover:border-ink-600 hover:text-fg"
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.color }} />
          {c.label}
        </a>
      ))}
    </div>
  );
}