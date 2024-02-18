
<script lang="ts">
	import Index from '$lib/components/posts/Index.svelte';
	import { i18n } from '$lib/stores/lang';
	import type { PageData } from './$types';

	export let data: PageData;

</script>

<svelte:head>
	<title>{i18n.siteName}</title>
	<meta name="description" content={i18n.siteDescription} />
</svelte:head>

<Index posts={data.index} lang={data.lang} />
