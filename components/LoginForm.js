'use client';

import { useState } from 'react';

export default function LoginForm() {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') || '').trim();
    const password = String(form.get('password') || '');

    if (!email || !password) {
      setError('Enter your email address and password.');
      return;
    }

    setError('Incorrect email or password. Please check your details and try again.');
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-line bg-ink-850/72 p-6 shadow-card sm:p-8">
      <div className="flex items-center gap-2">
        <span className="glow-dot h-2.5 w-2.5 rounded-full bg-brand shadow-glow" />
        <span className="text-sm font-semibold uppercase tracking-[0.16em] text-fg-muted">
          Account
        </span>
      </div>

      <h2 className="mt-3 text-2xl font-bold tracking-tight text-fg">Welcome back</h2>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">
        Sign in with your account to keep reading the feed.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-fg">Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="rounded-lg border border-ink-600 bg-ink-900 px-3.5 py-2.5 text-fg placeholder:text-fg-faint outline-none transition-colors focus:border-brand"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-fg">Password</span>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-ink-600 bg-ink-900 px-3.5 py-2.5 pr-16 text-fg placeholder:text-fg-faint outline-none transition-colors focus:border-brand"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-xs font-semibold text-fg-faint transition-colors hover:text-fg"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'HIDE' : 'SHOW'}
            </button>
          </div>
        </label>

        {error && (
          <p role="alert" className="rounded-lg border border-bear/30 bg-bear/10 px-3 py-2 text-xs font-medium text-bear">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-1 inline-flex w-full items-center justify-center rounded-lg bg-brand px-4 py-2.5 text-sm font-bold text-ink-950 transition-transform hover:scale-[1.02]"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}