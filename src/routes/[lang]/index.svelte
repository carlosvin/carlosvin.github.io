<script context="module" lang="ts">
	export async function load({fetch, params}) {
		const lang = {params};
		return {
			props: await (await fetch(`${lang}/json`)).json()
		};
	}
</script>

<script lang="ts">

	import Index from '$lib/components/posts/Index.svelte';
	import type { IndexEntry } from '$lib/models/interfaces';

	export let index: IndexEntry[];
	export let name: string;
	export let description: string;
</script>

<svelte:head>
	<title>{name}</title>
	<meta name="description" content={description} />
	<link rel="alternate" href="index.jsonld" type="application/ld+json" />
</svelte:head>

<Index posts={index} />
