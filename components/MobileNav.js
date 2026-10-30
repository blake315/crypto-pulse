'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import site from '../config/site';

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-ink-950/95 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-7xl items-stretch px-4">
        {site.nav.map((item) => {
          const active =
            item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold uppercase tracking-wide ${
                active ? 'text-brand' : 'text-fg-faint'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-brand' : 'bg-fg-faint/40'}`} />
              {item.label.split(' ')[0]}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}