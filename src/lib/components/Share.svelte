<script lang="ts">
	import { toHashtags } from '$lib/services/slug';
	import IconLink from './IconLink.svelte';
	export let title: string;
	export let text: string;
	export let url: string;
	export let keywords: string[] = [];

	const canShare = typeof navigator !== 'undefined' && navigator.share;

	async function share() {
		try {
			await navigator.share({ title, text: text + toHashtags(keywords), url });
		} catch (err) {
			console.error('Sharing', err);
		}
	}
</script>

{#if canShare}
	<button on:click={share} {title} type="button" ></button>
{:else}
	<IconLink
		href={`https://twitter.com/intent/tweet?url=${url}&text=${title}:&nbsp;${text}&hashtags=${keywords.join(
			','
		)}`}
		title={`Share "${title}"`}
		icon="twitter"
	/>
{/if}

<style>
	button {
		display: block;
		background: transparent;
		border: none;
		font-family: 'icomoon' !important;
	}

	button::after {
		content: '\ea82';
	}
</style>
