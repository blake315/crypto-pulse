'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useRef } from 'react';

const GATE = 'crypto-pulse-auth';
const SIGNAL = 10;
const WINDOW = 2600;
const TTL = 60 * 60 * 24 * 7;

export default function BrandTap({ onInteract }) {
  const pathname = usePathname();
  const router = useRouter();
  const hits = useRef(0);
  const timer = useRef(null);

  function tap(e) {
    if (pathname !== '/login') {
      if (onInteract) onInteract();
      return;
    }

    e.preventDefault();
    if (onInteract) onInteract();

    hits.current += 1;
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      hits.current = 0;
    }, WINDOW);

    if (hits.current >= SIGNAL) {
      if (timer.current) window.clearTimeout(timer.current);
      hits.current = 0;
      document.cookie = `${GATE}=1; path=/; max-age=${TTL}; samesite=lax`;
      const params = new URLSearchParams(window.location.search);
      const next = params.get('next');
      const target = next && next.startsWith('/') && !next.startsWith('//') ? next : '/';
      router.push(target);
    }
  }

  return (
    <Link href="/" onClick={tap} className="flex shrink-0 items-center gap-2">
      <span className="glow-dot h-2.5 w-2.5 rounded-full bg-brand shadow-glow" />
      <span className="text-lg font-bold tracking-tight text-fg">
        Crypto<span className="text-brand">Pulse</span>
      </span>
    </Link>
  );
}