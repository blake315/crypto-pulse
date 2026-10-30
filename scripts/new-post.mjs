import fs from 'node:fs';
import path from 'node:path';
import config from '../config/site.js';

/** Tiny scaffolder: `npm run post` creates a new dated, id-carrying post
 *  file under `content/posts/`. Run it and fill in the fields. */
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 72) || 'draft-post';

const postsDir = path.join(process.cwd(), 'content', 'posts');
const today = new Date();
const dateStr = today.toISOString().slice(0, 10);
const id = Number(String(Date.now()).slice(-10));

if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

const [titleArg, catArg] = process.argv.slice(2);
const title = titleArg || 'New post title';
const category = config.categories.some((c) => c.slug === catArg)
  ? catArg
  : config.categories[0].slug;
const slug = slugify(title);
const file = path.join(postsDir, `${dateStr}-${slug}.json`);

const post = {
  id,
  slug,
  title,
  summary: 'One-sentence teaser shown on cards. Replace me.',
  category,
  source: config.sources[0],
  sentiment: 'Neutral',
  tags: [''],
  date: new Date().toISOString(),
  readMinutes: 3,
  isPromoted: false,
  externalUrl: null,
  body: [
    { h: 'Intro' },
    { p: 'Write the post as a list of blocks: { h: "Heading" } and { p: "Paragraph" }.' },
    { p: 'Tip: keep each paragraph short — readers scan crypto feeds fast.' },
  ],
};

fs.writeFileSync(file, JSON.stringify(post, null, 2) + '\n', 'utf8');
console.log(`✓ Created ${path.relative(process.cwd(), file)} (id ${id})`);
console.log(
  `  Category "${config.categories.find((c) => c.slug === category).label}" — edit fields then commit & deploy.`
);