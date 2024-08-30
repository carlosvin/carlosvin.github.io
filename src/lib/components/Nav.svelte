<script lang="ts">
	import NavEntry from '$lib/components/NavEntry.svelte';
	import type { TranslationsInterface } from '$lib/stores/locales/interface';

	export let segment: string | undefined;
	export let lang: string;
	export let translations: TranslationsInterface;

	function toggle() {
		open = !open;
	}
	let open = false;
</script>

<nav>
	<ul>
		<NavEntry href={`/langs/${lang}/posts`} {segment}>
			<img class="logo" src="/favicon.25px.png" alt="{translations.siteName} logo" />
		</NavEntry>
	</ul>
	<ul class={open ? 'open' : 'closed'}>
		<NavEntry href={`/langs/${lang}/posts`} {segment}>
			<span class="siteName">{translations.siteName}</span>
		</NavEntry>
		<NavEntry href={`/langs/${lang}/categories`} {segment}>{translations.Categories}</NavEntry>
		<NavEntry href={`/langs/${lang}/about`} {segment}>{translations.AboutMe}</NavEntry>
	</ul>
	{#if !open}
		<slot />
	{/if}
	<button on:click={toggle} type="button">≡</button>
</nav>

<style>
	nav {
		border-bottom: 1px solid rgba(255, 62, 0, 0.1);
		font-weight: 300;
		padding: 0 1em;
		display: flex;
		justify-content: space-between;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	button {
		display: none;
	}

	img.logo {
		max-height: 1.6em;
		width: 25px;
		height: 25px;
	}

	@media only screen and (max-width: 640px) {
		ul.open {
			display: flex;
			flex-flow: column;
		}

		ul.closed {
			display: none;
		}

		button {
			display: block;
			background: transparent;
			border: none;
			font-size: 2em;
			height: 2em;
		}
	}
</style>
