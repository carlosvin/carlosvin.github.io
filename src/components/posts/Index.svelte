
<script>
  import Index from '../Index.svelte';
  import Entry from './Entry.svelte';
  import Search from '../Search.svelte';
  import Header from './Header.svelte';
  export let posts;
  export let title = undefined;

  let founds;

  $: index = founds ? founds : posts;
</script>

<Header numPosts={index ? index.length : 0} {title}>
  <Search index={posts} bind:founds={founds} />
</Header>

<Index>
  {#each index as post}
    <Entry {post}/>
  {/each}
</Index>
