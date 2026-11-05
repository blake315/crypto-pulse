import { OLYMPTRADE_URL } from '../lib/partners';

/**
 * Promotional video card shown beside blog articles. The 1:1 creative
 * (`/public/ads/olymptrade/promo-video-1080x1080.mp4`) is a UGC-styled
 * Olymp Trade ad; it renders muted + looping by default, with native
 * controls so viewers can unmute.
 */
export default function PartnerVideo({ className = '' }) {
  return (
    <aside
      className={`overflow-hidden rounded-xl border border-line bg-ink-850 ${className}`}
      aria-label="Sponsored: Olymp Trade video"
    >
      <div className="flex items-center justify-between gap-2 border-b border-line/60 px-4 py-3">
        <h2 className="text-sm font-bold tracking-tight text-fg">Watch</h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
          Sponsored
        </span>
      </div>

      <a
        href={OLYMPTRADE_URL}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="group block"
      >
        <video
          className="block aspect-square w-full bg-ink-950 object-cover"
          src="/ads/olymptrade/promo-video-1080x1080.mp4"
          controls
          muted
          loop
          playsInline
          preload="metadata"
        />
      </a>

      <div className="p-4">
        <p className="text-sm leading-relaxed text-fg-muted">
          See how traders spot moves with Olymp Trade — practice on a free demo before
          trading live.
        </p>
        <a
          href={OLYMPTRADE_URL}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-brand px-4 py-2 text-sm font-bold text-ink-950 transition-transform hover:scale-[1.02]"
        >
          Start trading
        </a>
        <p className="mt-2 text-center text-[11px] leading-relaxed text-fg-faint">
          Trading involves risk. This is a paid promotion, not financial advice.
        </p>
      </div>
    </aside>
  );
}