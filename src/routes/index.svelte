
<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';


	onMount(async () => {
		const lang = navigator.language.substring(0,2);
		goto(lang, {replaceState: true});
	});


</script>
<p>loading...</p>