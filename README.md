# Crypto Pulse

A lightweight crypto information hub built with **Next.js 14 (App Router)** and **Tailwind CSS**. Posts are plain JSON files — no database, no login. Deployable to Vercel in one click.

## Stack

- Next.js 14 · React 18 · Tailwind CSS 3
- Content: `content/posts/*.json`
- Market snapshot: `content/tickers.json` (static, updated when publishing)
- Ad slots: `lib/partners.js` — clearly-labelled sponsored placements

## Layout (informed by existing aggregators)

- **Sticky nav** + scrolling **price ticker** (CoinTelegraph-style)
- **Card feed** with category chips, sentiment badges, source & time (CryptoPanic-style)
- **Double column**: main stream + right rail (market pulse, top picks, categories)
- **Ad slots**: leaderboard (top), rectangle (sidebar), native in-feed, mobile band
- Dark-first theme, green-up / red-down

## Run locally

```bash
npm install
npm run dev
# http://localhost:3000
```

## Publish a post

```bash
npm run post "My headline" exchange-arena
# creates content/posts/YYYY-MM-DD-my-headline.json — fill fields, commit, deploy
```

Categories: `market-analysis` | `exchange-arena` | `insights`

## Post format

```json
{
  "id": 1000000001,
  "slug": "a-unique-slug",
  "title": "...",
  "summary": "...",
  "category": "market-analysis",
  "source": "CP Desk",
  "sentiment": "Bullish | Cautious | Bearish | Neutral",
  "tags": ["btc"],
  "date": "2026-10-30T08:00:00Z",
  "readMinutes": 4,
  "isPromoted": false,
  "externalUrl": null,
  "body": [
    { "h": "Heading" },
    { "p": "Paragraph with **bold** and `code`." },
    { "list": ["item one", "item two"] },
    { "quote": "A pull quote" },
    { "note": "Disclosures or caveats" }
  ]
}
```

## Ad slots

`lib/partners.js` maps each slot (`leaderboard`, `rectangle`, `native`, `mobile`) to a list of partner objects:

```js
{
  name: "Venue Name",
  href: "https://partner-landing.example/ref",
  tagline: "Trade 200+ pairs",
  cta: "Sign up",
  image: null,
}
```

Empty arrays render labelled placeholders — nothing pretends to be a live promo before you add real creatives.

## Deploy to Vercel

```bash
npm install -g vercel
vercel          # preview
vercel --prod   # production
```

Or push this repo to GitHub and import it in the Vercel dashboard (Next.js auto-detected).