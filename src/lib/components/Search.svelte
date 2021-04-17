<script lang="ts">
import type { IndexEntry } from "$lib/models/interfaces";

  import { filter } from "fuzzy";

  export let index: IndexEntry[];
  export let founds: IndexEntry[];

  let search: string|undefined;

  $: {
    if (search) {
      founds = filter(search, [...index.map((s) => JSON.stringify(s))])
        .map((f) => f.string)
        .map((fs) => JSON.parse(fs));
    } else {
      founds = index;
    }
  }
</script>

<style>
  label {
    font-size: smaller;
    color: #644d4d;
  }

  span {
    display: flex;
    flex-flow: column;
  }

  @media screen and (max-width: 640px) {
    span {
      flex-flow: row;
      justify-content: space-between;
    }
  }
</style>

<span>
  <input
    type="search"
    placeholder="Search"
    bind:value={search}
    id="search-posts" />
  {#if founds}
    <label for="search-posts">{`Found ${founds.length}`}</label>
  {/if}
</span>
