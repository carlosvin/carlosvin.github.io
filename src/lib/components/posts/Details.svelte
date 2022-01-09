<script lang="ts">
	import type { PostProps } from '$lib/models/interfaces';

	import Tags from '$lib/components/Tags.svelte';

	export let post: PostProps;
</script>

<div class="subtitle">
	<span class="date">{new Date(post.modified).toLocaleDateString()}</span>
	<Tags tagList={post.keywords} lang={post.lang} />
</div>

<style>
	.subtitle {
		font-size: small;
		font-family: 'Courier New', Courier, monospace;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		height: max-content;
		vertical-align: middle;

	}
	.date {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
