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
	import { lang, setLang } from '$lib/stores/lang';
	import { onMount } from 'svelte';


	onMount(async () => {
		setLang(navigator);
	});
	
	export let path = '/';
</script>

<Nav segment={path} siteName={`Carlos says blabla ${$lang}`}/>

<slot />
