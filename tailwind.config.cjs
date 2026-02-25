/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        surface: {
          900: '#0e1011',
          800: '#161a1c',
          700: '#1e2225',
          600: '#272c30',
          500: '#363c42',
          400: '#4a5259',
        },
        accent: {
          gold: '#d4a574',
          'gold-dim': '#be8d5a',
          rose: '#c49690',
          'rose-dim': '#a87a76',
        },
      },
    },
  },
  plugins: [],
};
