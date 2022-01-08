<script lang="ts">
	import { goto } from '$app/navigation';
	import { getLang } from '$lib/services/navigator';
	import { onMount } from 'svelte';

	onMount(async () => {
		goto(`/langs/${getLang(navigator)}/posts`, { replaceState: true });
	});
</script>
