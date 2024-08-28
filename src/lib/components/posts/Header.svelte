<script lang="ts">
	import type { TranslationsInterface } from '$lib/stores/locales/interface';

	export let numPosts: number;
	export let translations: TranslationsInterface;
	export let title = numPosts > 0 ? translations.RecentPosts : translations.NoPosts;
</script>

<header>
	<h1>{title}</h1>
	<slot />
</header>

<style>
	header {
		display: flex;
		flex-flow: row;
	}

	h1 {
		flex-grow: 1;
	}

	@media screen and (max-width: 640px) {
		header {
			flex-flow: column;
		}
	}
</style>
