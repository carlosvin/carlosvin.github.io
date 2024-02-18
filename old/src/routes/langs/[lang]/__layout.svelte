<script lang="ts" context="module">
	import { i18n } from '$lib/stores/lang';
	import type { LoadInput } from '@sveltejs/kit';

	export async function load({ params, url }: LoadInput) {
		const { lang } = params;
		if (lang && (lang !== i18n.lang || i18n.lang === undefined)) {
			i18n.setLang(lang);
			if (typeof document !== 'undefined') {
				document.documentElement.lang = lang;
			}
		}
		return { props: { path: url.pathname, lang } };
	}
</script>

<script lang="ts">
	import '../../../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Social from '$lib/components/Social.svelte';
	import IconLink from '$lib/components/IconLink.svelte';
	import GoogleAnalytics from '$lib/components/analytics/GoogleAnalytics.svelte';

	export let path = '/';
	const {lang, siteName} = i18n;
</script>

{#if import.meta.env.PROD}
	<GoogleAnalytics />
{/if}

{#if lang}
	<Nav segment={path} siteName={siteName} lang={lang}>
		<Social>
			<IconLink
				icon="rss"
				href={`/langs/${lang}/feed.xml`}
				title={`${i18n.get('SubscribeTo')} ${siteName}`}
			/>
		</Social>
	</Nav>
{/if}
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
