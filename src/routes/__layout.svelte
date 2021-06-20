<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page }) {
		const lng = page.params.lang;
		if (lng) {
			lang.set(lng)
		}
		return { props: { path: page.path }};
	}
</script>

<script>
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import { lang, I18N } from '$lib/stores/lang';
	
	export let path = '/';
</script>

<Nav segment={path} siteName={I18N.get($lang, 'siteName')} lang={$lang} />

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