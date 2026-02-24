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
          900: '#0b0e0a',
          800: '#111510',
          700: '#181e14',
          600: '#1f2619',
          500: '#2a3221',
          400: '#374030',
        },
        accent: {
          sage: '#6ee7b7',
          'sage-dim': '#34d399',
          terra: '#d97756',
          'terra-dim': '#c4623e',
        },
      },
    },
  },
  plugins: [],
};
