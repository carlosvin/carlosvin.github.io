<script lang="ts">
	import { goto } from '$app/navigation';
	import { getLang } from '$lib/services/navigator';
	import { i18n } from '$lib/stores/lang';
	import { onMount } from 'svelte';

	onMount(async () => {
		goto(`/langs/${getLang(navigator)}`, { replaceState: true });
	});

	let langs = [...i18n.langs];
</script>

<p>loading...
</p>
{#each langs as lang}
<a href={`/langs/${lang}`}>{lang}</a>
{/each}