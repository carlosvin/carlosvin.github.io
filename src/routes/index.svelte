<script context="module" lang="ts">
	import { browser } from '$app/env';

	export async function load({fetch}) {
		if (browser) {
			return {
				props: await (await fetch(`indexes/${navigator.language.substring(0,2)}.json`)).json()
			};
		}
		return {props: {index: []}};
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
