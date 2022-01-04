<script context="module" lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';

	export function load({ params }: LoadInput): LoadOutput {
		return {
			status: 301, //permanent redirect
			redirect: 'feed.xml'
		};
	}
</script>
