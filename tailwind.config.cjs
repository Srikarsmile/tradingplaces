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
          900: '#0a0e17',
          800: '#0f1520',
          700: '#151c2c',
          600: '#1c2438',
          500: '#242d44',
          400: '#2e3a52',
        },
      },
    },
  },
  plugins: [],
};
