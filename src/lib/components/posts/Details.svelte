<script lang="ts">
import type { IndexEntry } from "$lib/models/interfaces";

  import Tags from "../Tags.svelte";
  
  export let post: IndexEntry;
</script>

<style>
.subtitle {
    font-size: small;
    font-family: 'Courier New', Courier, monospace;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
}
</style>

<div class='subtitle'>
    <span class="date">{new Date(post.modified).toLocaleDateString()}</span>
    <Tags tagList={post.keywords}/>
</div>