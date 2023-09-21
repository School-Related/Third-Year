/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    // "./*/*.{html,js, jsx, ts, tsx, md, mdx}",
    "./src/*.{html,js, jsx, ts, tsx, md, mdx}",
    "./src/*/*.{html,js, jsx, ts, tsx, md, mdx}",
    "./src/*/*/*.{html,js, jsx, ts, tsx, md, mdx}",
    "./src/components/*.{js, jsx, ts, tsx}",
    // "node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    // "node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    // "./*.html", "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
