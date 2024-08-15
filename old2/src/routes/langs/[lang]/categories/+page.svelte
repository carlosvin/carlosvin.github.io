
<script lang="ts">
	import { categoryPath } from '$lib/services/url';

	import Index from '$lib/components/Index.svelte';
	import Entry from '$lib/components/Entry.svelte';

	import type { PageData } from './$types';
	import { i18n } from '$lib/stores/lang';

	export let data: PageData;

	const title = `${i18n.get('Categories')} | ${i18n.get('siteName')}`;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1>{title}</h1>
<Index>
	{#each data.index as c}
		<Entry>
			<a href={categoryPath(c.slug, data.lang)}>{c.name}</a>
		</Entry>
	{/each}
	<Entry>
		<a href="/">All posts</a>
	</Entry>
</Index>

