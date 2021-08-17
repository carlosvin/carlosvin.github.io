<script context="module" lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';

	export async function load({ page, fetch }: LoadInput): Promise<LoadOutput> {
		const { props, html } = await (await fetch(`${page.path}.json`)).json();
		return { props: { props, html } };
	}
</script>

<script lang="ts">
	import 'highlight.js/styles/default.css';
	import type { PostProps } from '$lib/models/interfaces';
	import { postPath } from '$lib/services/url';
	import Share from '$lib/components/Share.svelte';
	import Details from '$lib/components/posts/Details.svelte';
	import Content from '$lib/components/posts/Content.svelte';

	export let props: PostProps;
	export let html: string;
</script>

<svelte:head>
	<title>{props.title}</title>
	<meta name="date.created" content={new Date(props.created).toISOString()} />
	<meta name="date.updated" content={new Date(props.modified).toISOString()} />
	<meta name="description" content={props.summary} />
	{#if props.otherLangs && props.otherLangs.length > 0}
		{#each props.otherLangs as lang}
			<link rel="alternate" hreflang={lang} href={postPath(props.slug, lang)} />
		{/each}
	{/if}
	<link rel="alternate" href="{props.path}.ld.json" type="application/ld+json" />
</svelte:head>

<header>
	<h1>
		{props.title}
		<span class="share">
			<Share title={props.title} keywords={props.keywords} text={props.summary} url={props.path} />
		</span>
	</h1>
	<p class="summary">{props.summary}</p>
	<Details post={props} />
</header>

<Content>
	{@html html}
	<div class="comments">
		<script
			src="https://utteranc.es/client.js"
			repo="carlosvin/carlosvin.github.io"
			issue-term="pathname"
			theme="github-light"
			crossorigin="anonymous"
			async>
		</script>
	</div>
	<a href="/posts/{props.slug}/{props.lang}"> </a>
	<a href="/posts/{props.slug}"> </a>
</Content>

<style>
	h1 {
		font-size: 2em;
		display: flex;
		justify-content: space-between;
		margin-bottom: 0;
	}

	.share {
		font-size: 0.5em;
	}

	header {
		border-bottom: #e9e9e9 solid 1px;
		padding-bottom: 0.4em;
		margin-bottom: 1.2em;
	}

	.summary {
		margin: 0.2em 0 0.2em 0;
		color: #644d4d;
		line-height: 1.2em;
	}
</style>
