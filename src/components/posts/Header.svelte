
<script>
  export let numPosts;
  export let title = numPosts > 0 ? 'Recent posts' : `There are no posts`;
</script>

<style>
  header {
    display: flex;
    flex-flow: row;
  }

  h1 {
    flex-grow: 1;
  }

  @media screen and (max-width: 640px) {
    header {
      flex-flow: column;
    }
  }
</style>

<header>
  <h1>{title}</h1>
  <slot></slot>
</header>
