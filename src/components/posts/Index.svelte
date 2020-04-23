
<script>
  import Index from '../Index.svelte';
  import Entry from './Entry.svelte';
  export let posts;
</script>


<Index>
  {#each posts as post}
    <Entry {post}/>
  {/each}
</Index>
