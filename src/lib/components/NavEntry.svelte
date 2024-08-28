<script lang="ts">
	function curr(segment: string | undefined, href: string): 'page' | boolean {
		if (segment === undefined && href === '.') {
			return 'page';
		} else if (segment?.startsWith(href)) {
			return 'page';
		} else {
			return false;
		}
	}

	export let segment: string | undefined;
	export let href: string;

	$: current = curr(segment, href);
</script>

<li>
	<a aria-current={current} {href} rel="prefetch">
		<slot />
	</a>
</li>

<style>
	li {
		display: block;
		float: left;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
		height: 1.6em;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
		box-shadow: inset 1px 1px 1em rgba(255, 62, 0, 0.1);
	}
</style>
