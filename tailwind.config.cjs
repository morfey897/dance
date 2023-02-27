const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Comfortaa', 'sans-serif']
			},
			transitionProperty: {
				...defaultTheme.transitionProperty,
				width: "width",
				height: "height",
				'max-height': "max-height",
			},
		},
		colors: {
			transparent: 'transparent',
			white: 'white',
			black: 'black',
			'pnk': {
				100: '#C00480',
				200: '#FF00A8',
			}
		}
	},
	plugins: [require("tailwindcss-hyphens")],
}
