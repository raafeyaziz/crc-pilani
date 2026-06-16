/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        white: '#FEFEFE',
        green: '#60D479',
        black: '#000000',
        red: '#B81413',
        grey: '#8B8B8B',
      },
      fontFamily: {
        geist: ['"Geist Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}

