<script lang="ts">
	import { goto } from '$app/navigation';
	import { getLang } from '$lib/stores/lang';
	import { onMount } from 'svelte';

	onMount(async () => {
		goto(`/langs/${getLang(navigator)}`, { replaceState: true });
	});
</script>

<p>loading...</p>
