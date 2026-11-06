/** Partner & advertisement registry.
 *
 *  Each array maps to an `AdSlot` position rendered by `components/AdSlot.js`
 *  (positions defined in `lib/market.js`). Every entry is a clearly-labelled
 *  sponsored placement — creatives live under `/public/ads/olymptrade/`.
 *
 *  Fields:
 *    name     — partner display name
 *    href     — partner landing / referral URL
 *    tagline  — short value prop shown beside the creative
 *    cta      — button label
 *    image    — path under `/public/` for the banner creative
 *    alt      — descriptive fallback text for the image
 */
export const OLYMPTRADE_URL = 'https://trkmad.com/2601954';

export const partners = {
  leaderboard: [
    {
      name: 'Olymp Trade',
      href: OLYMPTRADE_URL,
      tagline: 'Trade 200+ assets on one platform',
      cta: 'Start trading',
      image: '/ads/olymptrade/hero-1920x1080.png',
      video: '/ads/olymptrade/promo-video-1080x1080.mp4',
      alt: 'Olymp Trade — start trading banner',
    },
  ],
  rectangle: [
    {
      name: 'Olymp Trade',
      href: OLYMPTRADE_URL,
      tagline: 'Practice with a free demo account',
      cta: 'Open demo',
      image: '/ads/olymptrade/hero-1920x1080.png',
      alt: 'Olymp Trade — open a free demo account',
    },
  ],
  native: [
    {
      name: 'Olymp Trade',
      href: OLYMPTRADE_URL,
      tagline: 'Trading ideas & market analytics — free',
      cta: 'Explore',
    },
  ],
  mobile: [
    {
      name: 'Olymp Trade',
      href: OLYMPTRADE_URL,
      tagline: 'Trade on the go',
      cta: 'Get the app',
      image: '/ads/olymptrade/hero-1920x1080.png',
      alt: 'Olymp Trade mobile app',
    },
  ],
};