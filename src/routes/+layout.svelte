
<script lang="ts">
	import GoogleAnalytics from '$lib/components/analytics/GoogleAnalytics.svelte';
</script>

{#if import.meta.env.PROD}
	<GoogleAnalytics />
{/if}

<main>
	<slot />
</main>

<style>
	main {
		position: relative;
		max-width: 86%;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}

	@media (max-width: 32em) {
		main {
			max-width: unset;
		}
	}
</style>
