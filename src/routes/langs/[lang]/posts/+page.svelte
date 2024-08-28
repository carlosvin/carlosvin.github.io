<script lang="ts">
	import Index from '$lib/components/posts/Index.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.translations.siteName}</title>
	<meta name="description" content={data.translations.siteDescription} />
</svelte:head>

<Index posts={data.index} translations={data.translations} />
