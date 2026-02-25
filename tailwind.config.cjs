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
          900: '#000000',
          800: '#090909',
          700: '#111111',
          600: '#1a1a1a',
          500: '#252525',
          400: '#333333',
        },
        accent: {
          pink:       '#f026d9',
          'pink-dim': '#d119c0',
          purple:     '#9333ea',
          'purple-dim':'#7c22d4',
        },
      },
    },
  },
  plugins: [],
};
