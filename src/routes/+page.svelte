<script lang="ts">
	import { goto } from '$app/navigation';
	import { getLang } from '$lib/services/navigator';
	import { onMount } from 'svelte';

	onMount(async () => {
		goto(`/langs/${getLang(navigator)}/posts`, { replaceState: true });
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
