<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import Social from '$lib/components/Social.svelte';
	import IconLink from '$lib/components/IconLink.svelte';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<Nav segment={data.path} lang={data.lang} translations={data.translations}>
	<Social>
		<IconLink
			icon="rss"
			href={`/langs/${data.lang}/feed.xml`}
			title={`${data.translations.SubscribeTo} ${data.translations.siteName}`}
		/>
	</Social>
</Nav>

<main>
	<slot />
</main>

<style>
	main {
		position: relative;
		max-width: 86%;
		background-color: white;
		margin: 2em auto;
		box-sizing: border-box;
	}

	@media (width < 32em) {
		main {
			max-width: unset;
			margin: 1em auto;
		}
	}
</style>
