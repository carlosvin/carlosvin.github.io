<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		return { props: { path: page.path }};
	}
</script>

<script>
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import { setLang, lang } from '$lib/stores/lang';
	import { onMount } from 'svelte';


	onMount(async () => {
		setLang(navigator);
	});
	
	export let path = '/';
</script>

<Nav segment={path} siteName={`Carlos says blabla`} lang={$lang} />

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