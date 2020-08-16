<script lang="ts">
    import IconLink from './IconLink.svelte';
    import {toHashtags} from '../services/slug';
    export let title: string;
    export let text: string;
    export let url: string;
    export let keywords = [];

    const canShare = typeof navigator !== 'undefined' && navigator.share;

    async function share () {
        try {
            await navigator.share({    title, 
                text: text + toHashtags(keywords), 
                url});
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
    <button on:click={share} title="{title}"/>
{:else}
    <IconLink 
        href="{`https://twitter.com/intent/tweet?url=${url}&text=${title}: ${text}&hashtags=${keywords.join(',')}`}" 
        title="{`Share "${title}"`}"
        icon="twitter"/>
{/if}
