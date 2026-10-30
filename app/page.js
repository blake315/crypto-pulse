import Link from 'next/link';
import PostCard from '@/components/PostCard';
import Sidebar from '@/components/Sidebar';
import CategoryTabs from '@/components/CategoryTabs';
import AdSlot from '@/components/AdSlot';
import { getLatestPosts, getTrendingPosts } from '@/lib/posts';
import site from '@/config/site';

export default function HomePage() {
  const [lead, ...rest] = getLatestPosts(7);
  const promoted = getTrendingPosts(1)[0];
  const latest = getLatestPosts(9);

  return (
    <div>
      {/* Intro strip */}
      <section className="mb-6 flex flex-col gap-3 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            The calm feed for a <span className="text-brand">loud market</span>.
          </h1>
          <p className="mt-2 max-w-xl text-fg-muted">{site.tagline}</p>
        </div>
        <div className="flex gap-2 text-xs text-fg-faint">
          <span className="rounded-full border border-line bg-ink-850 px-3 py-1.5">
            Snapshot · {site.tickersUpdated}
          </span>
        </div>
      </section>

      <CategoryTabs />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Main column */}
        <div>
          {/* Lead story */}
          {lead && (
            <div className="mb-5">
              <PostCard post={{ ...lead, isLead: true }} />
            </div>
          )}

          {/* Promoted — clearly labelled native slot */}
          {promoted && (
            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between px-1 text-xs text-fg-faint">
                <span className="font-semibold uppercase tracking-[0.14em]">
                  🔥 Promoted
                </span>
                <Link href={`/posts/${promoted.slug}`} className="text-brand hover:text-brand-soft">
                  Read →
                </Link>
              </div>
              <PostCard post={promoted} />
            </div>
          )}

          {/* Leaderboard ad above the fold */}
          <div className="mb-5">
            <AdSlot position="leaderboard" />
          </div>

          {/* The rest of the feed */}
          <div className="flex flex-col gap-5">
            {rest.map((post, i) => (
              <div key={post.slug} className="flex flex-col gap-5">
                <PostCard post={post} />
                {i === 1 && <AdSlot position="native" />}
              </div>
            ))}
          </div>

          {/* Grid overflow: more recent */}
          <div className="mt-10">
            <h2 className="mb-4 text-lg font-bold tracking-tight text-fg">Latest briefs</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latest.slice(2, 8).map((post) => (
                <div key={post.slug} className="[&_h3]:text-base [&_.line-clamp-2]:hidden">
                  <PostCard post={post} compact />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right rail */}
        <Sidebar />
      </div>
    </div>
  );
}