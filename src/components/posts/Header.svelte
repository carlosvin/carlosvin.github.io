
<script>
  export let numPosts;
</script>

<style>
  header {
    display: flex;
    flex-flow: row;
  }
  h1 {
    flex-grow: 1;
  }
</style>


<header>

{#if numPosts > 0}
  <h1>Recent posts</h1>
  <span>Total {numPosts}</span>
{:else}
  <h1>There are no posts</h1>
{/if}
</header>

