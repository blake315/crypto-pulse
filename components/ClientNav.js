'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import site from '../config/site';

export default function ClientNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-4">
      <Link href="/" className="flex shrink-0 items-center gap-2" onClick={() => setOpen(false)}>
        <span className="glow-dot h-2.5 w-2.5 rounded-full bg-brand shadow-glow" />
        <span className="text-lg font-bold tracking-tight text-fg">
          Crypto<span className="text-brand">Pulse</span>
        </span>
      </Link>

      <div className="hidden flex-1 items-center gap-1 md:flex">
        {site.nav.map((item) => {
          const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? 'bg-ink-700 text-fg'
                  : 'text-fg-muted hover:bg-ink-850 hover:text-fg'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="ml-auto hidden items-center gap-3 md:flex">
        <span className="rounded-full border border-line bg-ink-850 px-3 py-1.5 text-xs text-fg-muted">
          <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse-dot rounded-full bg-bull align-middle" />
          Market snapshot · {site.tickersUpdated}
        </span>
      </div>

      <button
        className="ml-auto flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-lg border border-line bg-ink-850 md:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span className={`h-0.5 w-4 bg-fg transition-transform ${open ? 'translate-y-1.5 rotate-45' : ''}`} />
        <span className={`h-0.5 w-4 bg-fg ${open ? 'opacity-0' : ''}`} />
        <span className={`h-0.5 w-4 bg-fg transition-transform ${open ? '-translate-y-1.5 -rotate-45' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-14 border-b border-line bg-ink-950 px-4 py-3 md:hidden">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-fg-muted hover:bg-ink-850 hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}