import { OLYMPTRADE_URL } from '../lib/partners';

/**
 * Partner-only marquee strip. The row is one ad repeated enough times to
 * overflow any viewport, then the whole row is duplicated. Spacing is a
 * per-item margin (not a container gap) and the keyframe moves exactly -50%,
 * so the second copy sits pixel-perfect where the first started — a true
 * seamless loop with no snap.
 */
export default function Ticker() {
  const segment = Array.from({ length: 16 });
  const items = [...segment, ...segment];

  return (
    <div className="relative overflow-hidden border-b border-line bg-ink-900">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-ink-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-ink-900 to-transparent" />
      <div className="flex w-max animate-marquee items-center py-3">
        {items.map((_, i) => (
          <a
            key={i}
            href={OLYMPTRADE_URL}
            target="_blank"
            rel="sponsored noopener noreferrer"
            aria-label="Sponsored: Olymp Trade"
            className="mr-12 flex shrink-0 items-center"
          >
            <img
              src="/ads/olymptrade/logo-267x69.png"
              alt="Olymp Trade"
              className="h-8 w-auto opacity-90 transition-opacity hover:opacity-100"
              loading="lazy"
            />
          </a>
        ))}
      </div>
    </div>
  );
}