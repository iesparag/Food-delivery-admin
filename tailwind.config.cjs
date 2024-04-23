/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // red: '#e70012',
        black: '#000',
        orange: '#ff7f00'

      }
    },
  },
  plugins: [],
});
