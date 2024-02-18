<script context="module" lang="ts">
	import type { IndexResponse, Category } from '$lib/models/interfaces';
	import { i18n } from '$lib/stores/lang';
	import type { LoadInput } from '@sveltejs/kit';

	interface Resp {
		props: {
			index: Category[];
			title: string;
			description: string;
			lang: string;
		};
	}

	export async function load({ fetch, params, url }: LoadInput): Promise<Resp> {
		const { lang } = params;
		const resp: IndexResponse<Category> = await (await fetch(`${url.pathname}/json`)).json();
		// TODO const jsonLd = jsonLdScript(jsonLdCategories(categories, title, description, request.path));
		return {
			props: {
				title: i18n.get('Categories'),
				index: resp.index,
				description: i18n.get('Index of blog categories'),
				lang
			}
		};
	}
</script>

<script lang="ts">
	import { categoryPath } from '$lib/services/url';

	import Index from '$lib/components/Index.svelte';
	import Entry from '$lib/components/Entry.svelte';

	export let index: Category[];
	export let title: string;
	export let description: string;
	export let lang: string;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<h1>{title}</h1>
{#if index}
	<Index>
		{#each index as c}
			<Entry>
				<a sveltekit:prefetch href={categoryPath(c.slug, lang)}>{c.name}</a>
			</Entry>
		{/each}
		<Entry>
			<a href="/">All posts</a>
		</Entry>
	</Index>
{:else}
	<p>Loading...</p>
{/if}
