import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { searchForWorkspaceRoot } from 'vite';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	server: {
		fs: {
		  allow: [
			// search up for workspace root
			searchForWorkspaceRoot(process.cwd()),
			'/static',
			'./static',
			'/static/posts',
			'./static/posts',
		  ],
		},
	  },
	kit: {
		adapter: adapter()
	}
};

export default config;
