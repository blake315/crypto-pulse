import ClientNav from './ClientNav';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink-950/90 backdrop-blur">
      <ClientNav />
    </header>
  );
}