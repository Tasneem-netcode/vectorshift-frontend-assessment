/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
      },
      colors: {
        dark: '#0F0F0F',
        deep: '#161616',
        surface: '#272727',
        text: '#E2E2E2',
        border: '#404040',
        accent: '#8B4DE5',
        secondary: '#1ED760',
      },
    },
  },
  plugins: [],
}