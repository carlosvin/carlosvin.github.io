<script context="module" lang="ts">
	import { DEFAULT_LANG } from '$lib/conf';
	import { postPath } from '$lib/services/url';
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';

	export function load({ page }: LoadInput): LoadOutput {
		const { slug, lang } = page.params;

		return {
			status: 301, //permanent redirect
			redirect: postPath(slug, lang || DEFAULT_LANG)
		};
	}
</script>
