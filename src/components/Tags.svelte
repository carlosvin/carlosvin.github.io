<script>
    import Tag from './Tag.svelte';
    
    export let tagList = [];
</script>

<style>
.tags {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
}
</style>

{#if tagList}
    <span class='tags'>
    {#each tagList as t}
        <Tag title={t} />
    {/each}
    </span>
{/if}