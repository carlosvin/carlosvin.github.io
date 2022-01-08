<script context="module" lang="ts">
	import type { LoadOutput } from '@sveltejs/kit';

	export function load(): LoadOutput {
		return {
			status: 301, //permanent redirect
			redirect: 'feed.xml'
		};
	}
</script>
