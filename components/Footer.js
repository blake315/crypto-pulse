import site from '../config/site';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-950 py-10 text-center">
      <p className="mx-auto max-w-7xl px-4 text-sm leading-relaxed text-fg-muted">
        {site.tagline}
      </p>
    </footer>
  );
}