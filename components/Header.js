import BrandTap from './BrandTap';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink-950/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-4">
        <BrandTap />
      </div>
    </header>
  );
}