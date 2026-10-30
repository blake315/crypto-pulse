import Feed from '@/components/Feed';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import { getPostsByCategory } from '@/lib/posts';
import site from '@/config/site';

export function generateStaticParams() {
  return site.categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const meta = site.categories.find((c) => c.slug === category);
  return {
    title: meta ? `${meta.label} feed` : 'Category',
    description: meta
      ? `Curated ${meta.label.toLowerCase()} briefs from ${site.name}.`
      : 'Curated crypto briefs.',
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const meta = site.categories.find((c) => c.slug === category);
  const posts = getPostsByCategory(category);

  return (
    <div>
      <Breadcrumbs items={[{ label: meta?.label || category }]} />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="inline-block h-8 w-8 rounded-xl"
            style={{ background: `${meta?.color}22`, border: `1px solid ${meta?.color}55` }}
          >
            <span className="flex h-full w-full items-center justify-center">
              <span className="h-2 w-2 rounded-full" style={{ background: meta?.color }} />
            </span>
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-fg">
              {meta?.label || category}
            </h1>
            <p className="text-sm text-fg-faint">
              {posts.length} {posts.length === 1 ? 'brief' : 'briefs'} published
            </p>
          </div>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-ink-600 bg-ink-850/60 p-12 text-center text-fg-muted">
          Nothing here yet — check back soon.
        </div>
      ) : (
        <Feed posts={posts} withAds={false} />
      )}

      <div className="mt-6">
        <AdSlot position="leaderboard" />
      </div>
    </div>
  );
}