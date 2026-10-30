import { notFound } from 'next/navigation';
import Link from 'next/link';
import PostBody from '@/components/PostBody';
import Breadcrumbs from '@/components/Breadcrumbs';
import PostCard, { CategoryBadge, Sentiment } from '@/components/PostCard';
import AdSlot from '@/components/AdSlot';
import { getAllPosts, getPostBySlug, getRelatedPosts, formatDate } from '@/lib/posts';
import site from '@/config/site';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Not found' };
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);
  const meta = site.categories.find((c) => c.slug === post.category);

  return (
    <div className="mx-auto max-w-4xl">
      <Breadcrumbs
        items={[
          { label: meta?.label || post.category, href: `/category/${post.category}` },
          { label: post.title },
        ]}
      />

      <article className="rounded-2xl border border-line bg-ink-850/72 p-6 shadow-card sm:p-10">
        <header>
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={post.category} />
            <Sentiment value={post.sentiment} />
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-fg sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-fg-muted">{post.summary}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-line/60 py-3 text-sm text-fg-faint">
            <span className="font-medium text-fg-muted">{post.source}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readMinutes} min read</span>
            {post.externalUrl && (
              <a
                href={post.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-1 font-semibold text-brand hover:text-brand-soft"
              >
                Visit source <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        </header>

        <div className="mt-8">
          <PostBody blocks={post.body} />
        </div>

        {post.tags?.some(Boolean) && (
          <footer className="mt-8 flex flex-wrap gap-2 border-t border-line/60 pt-6">
            {post.tags.filter(Boolean).map((t) => (
              <span
                key={t}
                className="rounded-md border border-ink-600 bg-ink-800 px-2.5 py-1 text-xs font-medium text-fg-muted"
              >
                #{t}
              </span>
            ))}
          </footer>
        )}
      </article>

      <div className="my-8">
        <AdSlot position="leaderboard" />
      </div>

      {related.length > 0 && (
        <section className="mt-10">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-lg font-bold tracking-tight text-fg">Keep reading</h2>
            <Link
              href={`/category/${post.category}`}
              className="ml-auto text-sm text-brand hover:text-brand-soft"
            >
              More in {meta?.label || 'this section'} →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {related.map((p) => (
              <div key={p.slug} className="[&_h3]:text-base">
                <PostCard post={p} compact />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}