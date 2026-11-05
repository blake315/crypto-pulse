import fs from 'node:fs';
import path from 'node:path';

/** Loads all post JSON files from `content/posts`, newest first. */
const postsDir = path.join(process.cwd(), 'content', 'posts');

export function getAllPosts() {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.json'));
  const posts = files
    .map((file) => {
      try {
        const raw = JSON.parse(
          fs.readFileSync(path.join(postsDir, file), 'utf8')
        );
        return { ...raw, slug: raw.slug || file.replace(/\.json$/, '') };
      } catch (err) {
        console.error(`Failed to parse ${file}:`, err.message);
        return null;
      }
    })
    .filter(Boolean);
  return posts.sort(
    (a, b) => new Date(b.date) - new Date(a.date) || b.id - a.id
  );
}

export function getPostBySlug(slug) {
  return getAllPosts().find((p) => p.slug === slug) || null;
}

export function getPostsByCategory(cat) {
  return getAllPosts().filter((p) => p.category === cat);
}

export function getLatestPosts(count = 6) {
  return getAllPosts().slice(0, count);
}

export function getTrendingPosts(count = 5) {
  return getAllPosts()
    .filter((p) => p.isPromoted === true)
    .slice(0, count);
}

export function getRelatedPosts(post, count = 3) {
  return getAllPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, count);
}

export function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/** Deterministic pseudo-random in [0, 1) from a string, so engagement
 *  numbers stay stable across builds and don't cause hydration drift. */
function seededUnit(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i += 1) {
    h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
  }
  return (h % 10000) / 10000;
}

/** Reading count in the 5,000–12,000 range, stable per post slug. */
export function getPostViews(post) {
  return 5000 + Math.floor(seededUnit(post.slug) * 7000);
}

/** Heat score (0–100) derived from views and recency, stable per post. */
export function getPostHeat(post) {
  const views = getPostViews(post);
  const ageDays = Math.max(
    0,
    (Date.now() - new Date(post.date).getTime()) / 86400000
  );
  const recency = Math.max(0, 100 - ageDays * 3);
  const viewsScore = Math.round(((views - 5000) / 7000) * 70);
  return Math.min(99, 30 + Math.round(recency * 0.4) + viewsScore);
}

export function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(iso);
}