<script context="module" lang="ts">
	declare type Resp = IndexResponse<PostProps> & { lang: string };

	import type { LoadInput } from '@sveltejs/kit';
	export async function load({ fetch, page }: LoadInput): Promise<{ props: Resp }> {
		const { lang } = page.params;
		const props: Resp = await (await fetch(`${lang}/json`)).json();
		return { props: { ...props, lang } };
	}
</script>

<script lang="ts">
	import Index from '$lib/components/posts/Index.svelte';
	import type { IndexResponse, PostProps } from '$lib/models/interfaces';

	export let index: PostProps[];
	export let title: string;
	export let description: string;
	export let lang: string;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<Index posts={index} {lang} />
