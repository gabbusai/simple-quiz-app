/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        pixelFont: ["Handjet", "system-ui"],
        punzyFont: ["Bangers", "system-ui"],
        jersey10: ["Jersey 10", "sans-serif"],
      }
    },
  },
  plugins: [],
}