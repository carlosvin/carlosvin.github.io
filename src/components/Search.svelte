
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
    };
</script>

<label>
    {founds ? founds.length : ''}
    <input type="search" placeholder="Search" bind:value={search} />
</label>
