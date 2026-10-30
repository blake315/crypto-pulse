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