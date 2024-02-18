<script context="module" lang="ts">
	import type { IndexResponse, PostProps } from '$lib/models/interfaces';
	import type { LoadInput } from '@sveltejs/kit';

	export async function load({ params, url, fetch }: LoadInput) {
		const { lang } = params;
		const resp: IndexResponse<PostProps> = await (await fetch(`${url.pathname}.json`)).json();
		return { props: { ...resp, lang } };
	}
</script>

<script lang="ts">
	import Index from '$lib/components/posts/Index.svelte';

	export let index: PostProps[];
	export let title: string;
	export let description: string;
	export let lang: string;
</script>

<svelte:head>
	<title>{`Posts related with ${title}`}</title>
	<meta name="description" content={description} />
</svelte:head>

<Index posts={index} {title} {lang} />
