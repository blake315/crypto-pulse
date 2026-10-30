import PostCard from './PostCard';
import AdSlot from './AdSlot';

/**
 * Feed renders the stream of post cards. By default it weaves sponsored
 * slots into the flow (top leaderboard + a native slot after the second
 * card). Pass `withAds={false}` on category/index pages that already
 * render their own placements.
 */
export default function Feed({ posts, withAds = true, compact = false }) {
  if (!posts.length) {
    return (
      <div className="rounded-xl border border-dashed border-ink-600 bg-ink-850/60 p-10 text-center text-fg-muted">
        No posts in this section yet. New entries appear as soon as a JSON file
        lands in <code className="text-brand/80">content/posts</code>.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {posts.map((post, i) => (
        <div key={post.slug} className="flex flex-col gap-5">
          {withAds && i === 0 && <AdSlot position="leaderboard" />}
          <PostCard post={post} compact={compact} />
          {withAds && i === 1 && <AdSlot position="native" />}
        </div>
      ))}
    </div>
  );
}