import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	build: {
		outDir: 'public'
	},
	plugins: [sveltekit()]
};

export default config;
