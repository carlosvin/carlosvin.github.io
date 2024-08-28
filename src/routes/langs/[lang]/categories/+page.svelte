<script lang="ts">
	import { categoryPath } from '$lib/services/url';

	import Index from '$lib/components/Index.svelte';
	import Entry from '$lib/components/Entry.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.translations.Categories}</title>
</svelte:head>

<h1>{data.translations.Categories}</h1>
<Index>
	{#each data.index as c}
		<Entry>
			<a href={categoryPath(c.slug, data.lang)}>{c.name}</a>
		</Entry>
	{/each}
	<Entry>
		<a href="/">{data.translations.AllPosts}</a>
	</Entry>
</Index>
