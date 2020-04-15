<script context="module">
	import {BLOG_BASE_PATH} from '../../conf';

	export async function preload({ params, query }) {
		const res = await this.fetch(`${BLOG_BASE_PATH}/${params.slug.join('/')}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { post: data };
		} else {
			this.error(res.status, data.message);
		}
	}
	// TODO add canonical link to translations
</script>

<script>
	// TODO remove workaround for this issue https://github.com/sveltejs/sapper/issues/904
	import { onMount } from 'svelte'
	onMount(async () => {
		;[...document.querySelectorAll('a[href^="#"]')].map(
		x => (x.href = document.location + new URL(x.href).hash)
		)
	})
	import {getIsoDateStr} from '../../services/dates';
	export let post;
</script>

<style>
	h1 {
		border-bottom: #e9e9e9 solid 1px;
		font-size: 2rem;
		margin-top: 2rem;
	}

	.content :global(h2) {
		font-size: 1.6rem;
		font-weight: 500;
		margin-top: 1.2em;
	}

	.content :global(h3) {
		font-size: 1.4rem;
		margin-top: 1em;
	}

	.content :global(h4) {
		font-size: 1.2rem;
		margin-top: 0.8em;
	}

	.content :global(h5) {
		font-size: 1rem;
		margin-top: 0.6em;
	}

	.content :global(h6) {
		font-size: 0.8rem;
		margin-top: 0.4em;
	}

	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}

	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}

	.content :global(.admonitionblock) {
		background: #e9e9e9;
		padding: 1em;
		border-radius: 0.2em;
	}

</style>

<svelte:head>
	<title>{post.title}</title>
	<meta name="date" content="{getIsoDateStr(post.date)}" scheme="YYYY-MM-DD">
	<meta name="description" content="{post.summary}" scheme="YYYY-MM-DD">
	<link 
		rel='preload' 
		href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/vs.min.css' 
		as='style' 
		onload="this.onload=null;this.rel='stylesheet'">
	<noscript>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/vs.min.css">
	</noscript>	
</svelte:head>

<h1>{post.title}</h1>

<div class='content'>
	{@html post.html}
</div>
