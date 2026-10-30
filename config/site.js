/** Site-wide configuration. Edit these strings to rebrand the site. */
const config = {
  name: 'Crypto Pulse',
  tagline: 'Curated market analysis, exchange intel & breaking crypto briefs.',
  description:
    'Crypto Pulse is an open information hub for crypto traders: market analysis, exchange reviews and promotions, and breaking market briefs. No sign-up required.',
  /** This is where affiliate links / tracking params belong.
   *  Add a <filter></filter><filter></filter>… — careful NOT to paste full tracking URLs here;
   *  instead keep the tag here and build the URL in `lib/partners.js`. */
  baseUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://crypto-pulse.vercel.app',
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Market Analysis', href: '/category/market-analysis', cat: 'market-analysis' },
    { label: 'Exchange Arena', href: '/category/exchange-arena', cat: 'exchange-arena' },
    { label: 'Insights', href: '/category/insights', cat: 'insights' },
  ],
  categories: [
    { slug: 'market-analysis', label: 'Market Analysis', color: '#38BDF8' },
    { slug: 'exchange-arena', label: 'Exchange Arena', color: '#F7931A' },
    { slug: 'insights', label: 'Insights', color: '#8B5CF6' },
  ],
  sources: [
    'CP Desk',
    'CP Markets',
    'CP Research',
    'CP Community',
    'Key Data',
  ],
  sentimentScale: ['Bullish', 'Cautious', 'Bearish', 'Neutral'],
  /** Increment this when `content/tickers.json` needs a fresh glance. */
  tickersUpdated: '2026-10-30',
};

export default config;