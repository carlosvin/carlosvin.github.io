<script lang="ts">
	import { page } from '$app/stores';

	/* eslint-disable */
	export const scriptGTag = `
	\<script\>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
		ga('create', '${import.meta.env.VITE_G_ANALYTICS}', 'auto');
	\</script\>
	`;

	$: {
		if (typeof ga !== 'undefined') {
			ga('send', 'pageview', $page.url.pathname);
		}
	}
</script>

<svelte:head>
	{@html scriptGTag}
</svelte:head>
