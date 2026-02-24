/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        surface: {
          900: '#07060f',
          800: '#0d0b1a',
          700: '#131128',
          600: '#1a1834',
          500: '#231f44',
          400: '#2e2a55',
        },
        accent: {
          indigo: '#818cf8',
          'indigo-dim': '#6366f1',
          rose: '#fb7185',
          'rose-dim': '#f43f5e',
        },
      },
    },
  },
  plugins: [],
};
