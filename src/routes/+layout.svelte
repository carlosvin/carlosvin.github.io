<script lang="ts">
	import GoogleAnalytics from '$lib/components/analytics/GoogleAnalytics.svelte';
</script>

{#if import.meta.env.PROD}
	<GoogleAnalytics />
{/if}

<slot />
