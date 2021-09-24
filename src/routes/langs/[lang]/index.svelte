<script context="module" lang="ts">
	import type { LoadInput } from '@sveltejs/kit';
	declare type Resp = IndexResponse<PostProps> & { lang: string };

	export async function load({ fetch, page }: LoadInput): Promise<{ props: Resp }> {
		const { lang } = page.params;
		const props: Resp = await (await fetch(`${lang}/json`)).json();
		return { props: { ...props, lang } };
	}
</script>

<script lang="ts">
	import Index from '$lib/components/posts/Index.svelte';
	import type { IndexResponse, PostProps } from '$lib/models/interfaces';
	import { i18n } from '$lib/stores/lang';
	
	export let index: PostProps[];
	export let lang: string;
</script>

<svelte:head>
	<title>{i18n.siteName}</title>
	<meta name="description" content={i18n.siteDescription} />
</svelte:head>

<Index posts={index} {lang}/>
