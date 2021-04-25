<script context="module" lang="ts">
	export async function load({ page, fetch }) {
		const { post } = await (await fetch(`${page.path}.json`)).json();
		return { props: post };
	}
</script>

<script lang="ts">
	import 'highlight.js/styles/default.css';
	import type { IndexEntry, Post } from '$lib/models/interfaces';
	import { postPath } from '$lib/services/url';
	import Share from '$lib/components/Share.svelte';
	import Details from '$lib/components/posts/Details.svelte';
	import Content from '$lib/components/posts/Content.svelte';

	export let entry: IndexEntry;
	export let html: string;
</script>

<svelte:head>
	<title>{entry.title}</title>
	<meta name="date.created" content={new Date(entry.created).toISOString()} />
	<meta name="date.updated" content={new Date(entry.modified).toISOString()} />
	<meta name="description" content={entry.summary} />
	{#if entry.otherLangs && entry.otherLangs.length > 0}
		{#each entry.otherLangs as lang}
			<link rel="alternate" hreflang={lang} href={postPath(entry.slug, lang)} />
		{/each}
	{/if}
	<link rel="alternate" href="{entry.path}.jsonld" type="application/ld+json" />
</svelte:head>

<header>
	<h1>
		{entry.title}
		<span class="share">
			<Share title={entry.title} keywords={entry.keywords} text={entry.summary} url={entry.path} />
		</span>
	</h1>
	<p class="summary">{entry.summary}</p>
	<Details post={entry} />
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
