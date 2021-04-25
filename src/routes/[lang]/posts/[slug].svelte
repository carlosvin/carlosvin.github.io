<script context="module" lang="ts">
	export async function load({page, fetch}) {

		await (await fetch(`${page.path}.json`)).json()
        console.log(page);
		return {
			props: page.params
            // 
		};
	}
</script>

<script lang="ts">

	import Index from '$lib/components/posts/Index.svelte';
	import type { IndexEntry } from '$lib/models/interfaces';

	export let lang;
    export let slug;
</script>
<hr>
create the post view {lang} {slug}