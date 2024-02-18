

<script lang="ts">
	import Index from '$lib/components/posts/Index.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{`Posts related with ${data.title}`}</title>
	<meta name="description" content={data.description} />
</svelte:head>

<Index posts={data.index} title={data.title} lang={data.lang} />
