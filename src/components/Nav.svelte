<script>
	import NavEntry from './NavEntry.svelte';
	export let segment;
	export let siteName;

	function toggle(){
		open = !open;
	}
	let open = false;
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
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
	}

	@media only screen and (max-width: 600px) {
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

		.siteName {
			display: none;
		}
	}

</style>

<nav>
	<ul>
		<NavEntry href='/' segment={segment}>
			<img class='logo' src='/favicon.png' alt={siteName} />
		</NavEntry>
	</ul>
	<ul class={open ? 'open' : 'closed'}>
		<NavEntry href='/' segment={segment}>
			<span class='siteName'>{siteName}</span>
		</NavEntry>
		<NavEntry href='/categories' segment={segment}>Categories</NavEntry>
		<NavEntry href='/about' segment={segment}>About</NavEntry>
	</ul>
	{#if !open}
		<slot></slot>
	{/if} 
	<button on:click={toggle}>≡</button>
</nav>
