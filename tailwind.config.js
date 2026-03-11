/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        app: {
          bg: 'var(--app-bg)',
          surface: 'var(--app-surface)',
          elevated: 'var(--app-elevated)',
          border: 'var(--app-border)',
          text: 'var(--app-text)',
          muted: 'var(--app-muted)',
          accent: 'var(--app-accent)',
          success: 'var(--app-success)',
          warning: 'var(--app-warning)',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(99, 102, 241, 0.35), 0 24px 80px rgba(15, 23, 42, 0.4)',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      animation: {
        'fade-in': 'fade-in 220ms ease-out',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
