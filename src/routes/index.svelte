
<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';


	onMount(async () => {
		goto(navigator.language.substring(0,2), {replaceState: true});
	});


</script>
<p>loading...</p>