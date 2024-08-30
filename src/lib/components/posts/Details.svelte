<script lang="ts">
	import type { PostProps } from '$lib/models/interfaces';

	import Tags from '$lib/components/Tags.svelte';
	import OtherLangLinks from './OtherLangLinks.svelte';

	export let post: PostProps;
</script>

<div class="subtitle">
	<span class="date">
		{new Date(post.modified).toLocaleDateString()}
	</span>
	<span class="langs">
		<OtherLangLinks {post} />
	</span>
	<Tags tagList={post.keywords} lang={post.lang} />
</div>

<style>
	.subtitle {
		font-size: small;
		font-family: 'Courier New', Courier, monospace;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		align-items: center;
		vertical-align: middle;
		height: max-content;
	}
</style>
