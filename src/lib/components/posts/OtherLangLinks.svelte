<script lang="ts">
	/**
	 * @component The OtherLangLinks component is rendering the other languages links for a post.
	 */
	import { postPath } from '$lib/services/url';
	import type { PostProps } from '$lib/models/interfaces';

	export let post: PostProps;
</script>

{#if post.otherLangs && post.otherLangs.length > 0}
	<ul class="otherLangs">
		{#each post.otherLangs as lang}
			{#if lang !== post.lang}
				<!-- Do not render the link if it is the current post language -->
				<li>
					<a
						rel="alternate"
						hreflang={lang}
						href={postPath(post.slug, lang)}
						title="Check the post in other language: {lang}">{lang}</a
					>
				</li>
			{/if}
		{/each}
	</ul>
{/if}

<style>
	li {
		list-style: none;
	}
	ul {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		padding: 0;
	}
</style>
