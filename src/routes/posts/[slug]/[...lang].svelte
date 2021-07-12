<script context="module">
	import { DEFAULT_LANG } from '$lib/conf';
	import { postPath } from '$lib/services/url';

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page }) {
		const {slug, lang} = page.params;
		
		return {
			status: 301, //permanent redirect
			redirect: postPath(slug, lang || DEFAULT_LANG)
		};
	}
</script>
