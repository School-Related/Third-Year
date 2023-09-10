/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./*/*.{html,js, jsx, ts, tsx, md, mdx}",
		"./src/*/*.{html,js, jsx, ts, tsx, md, mdx}",
		"./src/*/*/*.{html,js, jsx, ts, tsx, md, mdx}",
		"./src/components/*.{js, jsx, ts, tsx}",
		// "./*.html", "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
