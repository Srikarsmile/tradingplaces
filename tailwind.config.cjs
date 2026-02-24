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
          900: '#0c0d11',
          800: '#13151b',
          700: '#1a1d25',
          600: '#21252f',
          500: '#2a2f3c',
          400: '#343a48',
        },
        accent: {
          sky: '#38bdf8',
          'sky-dim': '#0ea5e9',
          coral: '#fb923c',
          'coral-dim': '#f97316',
        },
      },
    },
  },
  plugins: [],
};
