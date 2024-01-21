<script lang="ts">
	import type { PostProps } from '$lib/models/interfaces';

	import { filter } from 'fuzzy';

	export let index: PostProps[];
	export let founds: PostProps[];

	let search: string | undefined;

	$: {
		if (search) {
			founds = filter(search, [...index.map((s) => JSON.stringify(s))])
				.map((f) => f.string)
				.map((fs) => JSON.parse(fs));
		} else {
			founds = index;
		}
	}
</script>

<span>
	<input type="search" placeholder="Search" bind:value={search} id="search-posts" />
	{#if founds}
		<label for="search-posts">{`Found ${founds.length}`}</label>
	{/if}
</span>

<style>
	label {
		font-size: smaller;
		color: #644d4d;
	}

	span {
		display: flex;
		flex-flow: column;
	}

	@media screen and (max-width: 640px) {
		span {
			flex-flow: row;
			justify-content: space-between;
		}
	}
</style>
