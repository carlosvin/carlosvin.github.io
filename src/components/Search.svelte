
<script>
    import fuzzy from "fuzzy";

    export let index;
    export let founds;

    let search;

    $: {
        if (search) {
            founds = fuzzy.filter(
                search, 
                [...index.map(s => JSON.stringify(s))]
            ).map(f => f.string).map(fs => JSON.parse(fs));
        } else {
            founds = index;
        }
    }
</script>

<style>
label {
    font-size: smaller;
    color: gray;
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
<input type="search" placeholder="Search" bind:value={search} id='search-posts'/>
{#if founds}
<label for='search-posts'>{`Found ${founds.length}`}</label>
{/if}
</span>
