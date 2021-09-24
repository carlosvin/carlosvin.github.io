
<script lang="ts">
	import { i18n } from "$lib/stores/lang";

	export let numPosts: number;
	export let title = numPosts > 0 ? i18n.get('RecentPosts') : i18n.get('NoPosts');
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
