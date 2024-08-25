<script lang="ts">
	import { i18n } from '$lib/stores/lang';
	import Nav from '$lib/components/Nav.svelte';
	import Social from '$lib/components/Social.svelte';
	import IconLink from '$lib/components/IconLink.svelte';
	import type { SiteData } from './+layout.server';
	export let data: SiteData;
</script>

<Nav segment={data.path} siteName={data.siteName} lang={data.lang}>
	<Social>
		<IconLink
			icon="rss"
			href={`/langs/${data.lang}/feed.xml`}
			title={`${i18n.get('SubscribeTo')} ${data.siteName}`}
		/>
	</Social>
</Nav>

<slot />
