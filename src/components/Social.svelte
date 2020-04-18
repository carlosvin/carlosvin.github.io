<script>
    import IconLink from "./IconLink.svelte";
    export let horizontal = true;
</script>

<style>
    div {
        display: flex;
        vertical-align: middle;
    }

    .h {
        flex-flow: row;
    }

    .v {
        flex-flow: column;
    }
</style>

<div class={horizontal ? 'h' : 'v'}>
    <slot></slot>
    <IconLink href='https://github.com/carlosvin' icon='github'></IconLink>
    <IconLink href='https://twitter.com/carlosvin' icon='twitter'></IconLink>
    <IconLink href='https://stackoverflow.com/story/carlosvin' icon='stackoverflow'></IconLink>
</div>
