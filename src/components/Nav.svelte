<script>
	import {BLOG_BASE_PATH} from '../conf';
	import NavEntry from './NavEntry.svelte';
	export let segment;
	export let siteName;
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

</style>

<nav>
	<ul>
		<NavEntry href='.' segment={segment}>{siteName}</NavEntry>
		<NavEntry href='categories' segment={segment}>Categories</NavEntry>
		<NavEntry href='about' segment={segment}>About</NavEntry>
	</ul>
	<slot></slot>
</nav>
