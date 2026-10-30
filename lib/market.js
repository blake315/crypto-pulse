import tickers from '../content/tickers.json';

/** Fresh, curated market stats displayed in the top ticker strip.
 *  These are static JSON values — update them in `content/tickers.json`
 *  when you next touch the repo for publishing. The UI makes clear
 *  they are a snapshot, not a live feed. */
export function getTickers() {
  return tickers;
}

/** Ad placements — plain, honest placeholders until you supply real
 *  exchange creatives. Every slot is labelled so it never reads as
 *  editorial content. Configure the actual links/creatives in
 *  `lib/partners.js`. */
export const AdSlots = {
  leaderboard: {
    id: 'leaderboard-top',
    label: 'Partner banner · 970×90',
    cls: 'in-feed-leaderboard',
  },
  rectangle: {
    id: 'rectangle-side',
    label: 'Partner box · 300×250',
    cls: 'sidebar-rectangle',
  },
  native: {
    id: 'native-infeed',
    label: 'Sponsored post',
    cls: 'native-sponsored',
  },
  mobile: {
    id: 'mobile-band',
    label: 'Partner · 320×50',
    cls: 'mobile-band',
  },
};