
<script>
  import Header from './Header.svelte';
  import Entry from './Entry.svelte';
  export let posts;
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
  }
</style>

<ul>
  {#each posts as post}
    <Entry {post}/>
  {/each}
</ul>
