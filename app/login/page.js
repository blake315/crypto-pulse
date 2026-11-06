import LoginForm from '@/components/LoginForm';
import { OLYMPTRADE_URL } from '@/lib/partners';

export const metadata = {
  title: 'Sign in',
  description: 'Sign in to Crypto Pulse to keep reading the market briefs.',
};

const PROMO_BANNER = '/ads/olymptrade/hero-1920x1080.png';
const PROMO_VIDEO = '/ads/olymptrade/promo-video-1080x1080.mp4';

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col gap-8">
      <div className="grid w-full items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* Left — promo video, muted + autoplay */}
        <aside
          className="order-2 overflow-hidden rounded-xl border border-line bg-ink-850 lg:order-1"
          aria-label="Sponsored: Olymp Trade video"
        >
          <div className="flex items-center justify-between gap-2 border-b border-line/60 px-4 py-3">
            <h2 className="text-sm font-bold tracking-tight text-fg">Watch</h2>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
              Sponsored
            </span>
          </div>
          <a href={OLYMPTRADE_URL} target="_blank" rel="sponsored noopener noreferrer" className="group block">
            <video
              className="block aspect-square w-full bg-ink-950 object-cover"
              src={PROMO_VIDEO}
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
            />
          </a>
          <div className="p-4">
            <p className="text-sm leading-relaxed text-fg-muted">
              See how traders spot moves with Olymp Trade — practice on a free demo
              before trading live.
            </p>
            <a
              href={OLYMPTRADE_URL}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-brand px-4 py-2 text-sm font-bold text-ink-950 transition-transform hover:scale-[1.02]"
            >
              Start trading
            </a>
            <p className="mt-2 text-center text-[11px] leading-relaxed text-fg-faint">
              Trading involves risk. This is a paid promotion, not financial advice.
            </p>
          </div>
        </aside>

        {/* Right — the sign-in form (where the video used to sit) */}
        <div className="order-1 flex flex-col justify-center lg:order-2">
          <LoginForm />
        </div>
      </div>

      {/* Below — larger promo image */}
      <aside
        className="overflow-hidden rounded-xl border border-line bg-ink-850"
        aria-label="Sponsored: Olymp Trade banner"
      >
        <div className="flex items-center justify-between gap-2 border-b border-line/60 px-4 py-3">
          <h2 className="text-sm font-bold tracking-tight text-fg">Partner</h2>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
            Sponsored
          </span>
        </div>
        <a
          href={OLYMPTRADE_URL}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="group block transition-colors hover:border-brand/50"
        >
          <img
            src={PROMO_BANNER}
            alt="Olymp Trade — start trading banner"
            className="block h-auto w-full"
            loading="lazy"
          />
          <span className="block p-4">
            <span className="text-sm font-semibold text-fg">Trade 200+ assets on one platform</span>
            <span className="mt-1.5 inline-flex items-center gap-1 text-sm font-semibold text-brand transition-colors group-hover:text-brand-soft">
              Start trading <span aria-hidden>↗</span>
            </span>
          </span>
        </a>
      </aside>
    </div>
  );
}