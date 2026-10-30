import Link from 'next/link';

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-fg-faint">
      <Link href="/" className="hover:text-brand-soft">Home</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span aria-hidden>/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-brand-soft">{item.label}</Link>
          ) : (
            <span className="text-fg-muted">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}