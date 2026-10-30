/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05080F',
          900: '#070B14',
          850: '#0A101D',
          800: '#0D1424',
          750: '#111A2E',
          700: '#16213A',
          600: '#1E2C4B',
        },
        line: '#1B2740',
        fg: {
          DEFAULT: '#E6EDF7',
          muted: '#8B95A9',
          faint: '#5D6A82',
        },
        brand: {
          DEFAULT: '#F7931A',
          soft: '#FFB454',
        },
        bull: '#16C784',
        bear: '#EA3943',
        cyan: '#38BDF8',
        violet: '#8B5CF6',
      },
      fontFamily: {
        sans: [
          '"Inter"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        card: '0 1px 0 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.6)',
        glow: '0 0 0 1px rgba(247,147,26,0.35), 0 8px 32px -8px rgba(247,147,26,0.45)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        marquee: 'marquee 42s linear infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};