<script context="module" lang="ts">
	export async function load({fetch, params}) {
		const lang = {params};
		const props: PostProps = await (await fetch(`${lang}/json`)).json();
		return { props };
	}
</script>

<script lang="ts">

	import Index from '$lib/components/posts/Index.svelte';
	import type { PostProps } from '$lib/models/interfaces';

	export let index: PostProps[];
	export let name: string;
	export let description: string;
</script>

<svelte:head>
	<title>{name}</title>
	<meta name="description" content={description} />
	<link rel="alternate" href="index.jsonld" type="application/ld+json" />
</svelte:head>

<Index posts={index} />
