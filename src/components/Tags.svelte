<script>
    import Tag from './Tag.svelte';
    
    export let tagList = [];
</script>

<style>
span {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
}
</style>

{#if tagList}
    <span>
    {#each tagList as t}
        <Tag title={t} />
    {/each}
    </span>
{/if}