import PostCard from '@/components/PostCard';
import Sidebar from '@/components/Sidebar';
import CategoryTabs from '@/components/CategoryTabs';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllPosts } from '@/lib/posts';
import site from '@/config/site';

export const metadata = {
  title: 'All posts',
  description: `Browse every brief and analysis published on ${site.name}.`,
};

export default function ArchivePage() {
  const posts = getAllPosts();

  return (
    <div>
      <Breadcrumbs items={[{ label: 'All posts' }]} />
      <CategoryTabs />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex flex-col gap-5">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        <Sidebar />
      </div>
    </div>
  );
}