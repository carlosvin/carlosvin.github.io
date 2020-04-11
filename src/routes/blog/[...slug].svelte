<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`blog/${params.slug.join('/')}.json`);
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
	import {getIsoDateStr} from '../../services/dates';
	export let post;
</script>

<style>
	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
		margin-top: 1.2em;
	}

	.content :global(h3) {
		margin-top: 1em;
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

	h1 {
		border-bottom: #e9e9e9 solid 1px;
	}
</style>

<svelte:head>
	<title>{post.title}</title>
	<meta name="date" content="{getIsoDateStr(post.date)}" scheme="YYYY-MM-DD">
	<meta name="description" content="{post.summary}" scheme="YYYY-MM-DD">
</svelte:head>

<h1>{post.title}</h1>

<div class='content'>
	{@html post.html}
</div>
