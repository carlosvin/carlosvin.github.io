<script>
export let hover = true;
</script>
<style>
span {
    display: block;
    border-radius: 0.2em;
    padding: 0 0.3em 0 0.3em;
    box-shadow: 0.0em 0.0em 0.1em #777;
    background: #eee;
    white-space: nowrap;
    min-width: 48px;
    text-align: center;
}

.hover:hover {
    box-shadow: 0.0em 0.0em 0.2em #333;
}
</style>

<span class={hover ? 'hover' : undefined}>
    <slot></slot>
</span>
