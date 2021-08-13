<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page }) {
		const lng = page.params.lang;
		if (lng) {
			lang.set(lng);
			if (typeof document !== 'undefined') {
				document.documentElement.lang = lng;
			}
		}
		return { props: { path: page.path } };
	}
</script>

<script>
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import { lang, I18N } from '$lib/stores/lang';
	import Social from '$lib/components/Social.svelte';
	import IconLink from '$lib/components/IconLink.svelte';

	export let path = '/';
	const siteName = I18N.get($lang, 'siteName');
</script>

<Nav segment={path} {siteName} lang={$lang}>
	<Social>
		<IconLink
			icon="rss"
			href={`/langs/${$lang}/feed.xml`}
			title={`${I18N.get($lang, 'SubscribeTo')} ${siteName}`}
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
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}

	@media (max-width: 32em) {
		main {
			max-width: unset;
		}
	}
</style>
