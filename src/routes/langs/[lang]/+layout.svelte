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

<slot />
