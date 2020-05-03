<script>
    import Tag from './Tag.svelte';
    import {categoryPath} from '../services/url';
    export let tagList = [];
</script>

<style>
    
</style>

{#if tagList}
    <span>
    {#each tagList as t}
        <Tag title={t} href={categoryPath(t)} />
    {/each}
    </span>
{/if}