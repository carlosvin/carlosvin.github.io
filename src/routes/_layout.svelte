<script>
	import Nav from '../components/Nav.svelte';
  	import { getSiteName } from "../services/lang";
	import Social from '../components/Social.svelte';
	import IconLink from '../components/IconLink.svelte';

	export let segment;

	const siteName = getSiteName();
	const rssTitle = `Subscribe to ${siteName}`;
	const rssUrl = `/rss`;
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<svelte:head>
	<link
		rel="alternate"
		type="application/rss+xml"
		title={rssTitle}
		href={rssUrl} />
</svelte:head>
<Nav {segment} {siteName}>
	<Social>
		<IconLink icon="rss" href={rssUrl} title={rssTitle} />
	</Social>
</Nav>

<main>
	<slot></slot>
</main>