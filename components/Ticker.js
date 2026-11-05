import { getTickers } from '../lib/market';
import { OLYMPTRADE_URL } from '../lib/partners';

function fmtPrice(n) {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: n < 1 ? 3 : 2,
    maximumFractionDigits: n < 1 ? 3 : 2,
  });
}

export default function Ticker() {
  const tickers = getTickers();
  const coins = tickers.coins;

  // One seamless loop segment: all coins followed by the brand logo as a
  // spaced-out item. The segment is duplicated so the -50% marquee loops
  // without a jump (same scheme as the current coin strip).
  const segment = [
    ...coins.map((c) => ({ type: 'coin', coin: c })),
    { type: 'ad' },
  ];
  const items = [...segment, ...segment];

  return (
    <div className="relative overflow-hidden border-b border-line bg-ink-900">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-ink-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-ink-900 to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-8 py-2.5 pl-4">
        {items.map((item, i) => {
          if (item.type === 'ad') {
            return (
              <a
                key={`ad-${i}`}
                href={OLYMPTRADE_URL}
                target="_blank"
                rel="sponsored noopener noreferrer"
                aria-label="Sponsored: Olymp Trade"
                className="flex shrink-0 items-center"
              >
                <img
                  src="/ads/olymptrade/logo-267x69.png"
                  alt="Olymp Trade"
                  className="h-7 w-auto opacity-90 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              </a>
            );
          }

          const { coin: c } = item;
          const up = c.change >= 0;
          return (
            <div key={`${c.symbol}-${i}`} className="flex shrink-0 items-center gap-2 text-sm">
              <span className="font-semibold text-fg">{c.symbol}</span>
              <span className="font-mono text-fg-muted">${fmtPrice(c.price)}</span>
              <span className={`font-mono text-xs ${up ? 'text-bull' : 'text-bear'}`}>
                {up ? '▲' : '▼'} {Math.abs(c.change).toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}