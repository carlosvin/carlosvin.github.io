
<script lang="ts">
	import { goto } from '$app/navigation';
	import { lang } from '$lib/stores/lang';
	import { onMount } from 'svelte';

	onMount(async () => {
		lang.change(navigator);
		goto($lang, {replaceState: true});
	});
</script>
<p>loading...</p>