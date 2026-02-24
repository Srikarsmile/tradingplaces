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
          900: '#f5f1ea',
          800: '#ffffff',
          700: '#ede9e0',
          600: '#e4ded3',
          500: '#c8c2b6',
          400: '#9e9890',
        },
        accent: {
          charcoal: '#1e2d3e',
          'charcoal-dim': '#15222f',
          caramel:  '#c4906a',
          'caramel-dim': '#a97752',
        },
      },
    },
  },
  plugins: [],
};
