import Link from 'next/link';
import site from '@/config/site';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl py-20 text-center">
      <div className="text-brand text-sm font-bold uppercase tracking-[0.2em]">404</div>
      <h1 className="mt-3 text-3xl font-bold text-fg">That page moved on-chain.</h1>
      <p className="mt-3 text-fg-muted">
        The link you followed doesn&apos;t exist — it may have been retired or mistyped.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-ink-950 transition-transform hover:scale-105"
      >
        Back to {site.name}
      </Link>
    </div>
  );
}