import './globals.css';
import Header from '@/components/Header';
import Ticker from '@/components/Ticker';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import site from '@/config/site';

export const metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.baseUrl),
  openGraph: {
    title: site.name,
    description: site.description,
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#05080F',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ink-950 text-fg antialiased">
        <Header />
        <Ticker />
        <main className="mx-auto max-w-7xl px-4 pb-24 pt-6 lg:pb-10">{children}</main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}