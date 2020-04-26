<script>
    export let title;
    export let text;
    export let url;

    const canShare = typeof navigator !== 'undefined' && navigator.share;

    async function share () {
        try {
            await navigator.share({title, text, url})
        } catch(err) {
            console.error('Sharing', err);
        }
    }
</script>

<style>
button {
    display: block;
    background: transparent;
    border: none;
    font-family: 'icomoon' !important;
}

button::after {
    content: "\ea82";    
}
</style>
{#if canShare}
<button on:click={share} title={title}/>
{/if}