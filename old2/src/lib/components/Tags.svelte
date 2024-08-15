<script lang="ts">
	import Tag from '$lib/components/Tag.svelte';

	export let tagList: string[] = [];
	export let lang: string;
</script>

{#if tagList}
	<span class="tags">
		{#each tagList as t}
			<Tag title={t} {lang} />
		{/each}
	</span>
{/if}

<style>
	.tags {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
	}
</style>
