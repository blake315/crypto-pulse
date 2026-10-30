import { AdSlots } from '../lib/market';
import { partners } from '../lib/partners';

/**
 * AdSlot renders one partner placement. When `partners[position]` is empty
 * it shows a clearly-labelled placeholder so the page keeps its layout and
 * nothing pretends to be a live promo. Fill `lib/partners.js` to go live.
 *
 * @param {string} position  key of `AdSlots` ("leaderboard" | "rectangle" | "native" | "mobile")
 */
export default function AdSlot({ position, className = '' }) {
  const slot = AdSlots[position];
  if (!slot) return null;
  const items = partners[position] ?? [];
  const item = items[0];

  if (!item) {
    const compact = position === 'native';
    return (
      <aside
        id={slot.id}
        className={`relative flex items-center justify-center rounded-xl border border-dashed border-ink-600 bg-ink-850/60 text-center ${
          compact ? 'h-24' : 'h-28 sm:h-24'
        } ${className}`}
        aria-label={slot.label}
      >
        <div className="px-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-fg-faint">
            {slot.label}
          </div>
          <div className="mt-1 text-xs text-fg-muted">
            Reserve this slot via <code className="text-brand/80">lib/partners.js</code>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside id={slot.id} className={className} aria-label={`Sponsored: ${item.name}`}>
      <a
        href={item.href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="group block overflow-hidden rounded-xl border border-line bg-ink-850 transition-colors hover:border-brand/50"
      >
        <div className="flex h-28 items-center justify-between gap-4 p-4 sm:h-24">
          <div className="min-w-0 text-left">
            <div className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
              Sponsored
            </div>
            <div className="truncate font-semibold text-fg">{item.name}</div>
            <div className="truncate text-sm text-fg-muted">{item.tagline}</div>
          </div>
          <span className="shrink-0 rounded-lg bg-brand px-3.5 py-2 text-xs font-bold text-ink-950 transition-transform group-hover:scale-105">
            {item.cta}
          </span>
        </div>
      </a>
    </aside>
  );
}