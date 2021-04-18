
<script lang="ts">
    function curr(segment: string|undefined, href: string) {
        if (segment === undefined && href === '.') {
            return 'page';
        } else if (segment && href.endsWith(segment)) {
            return 'page';
        } else {
            return undefined;
        }
    }

    export let segment: string|undefined;
    export let href: string;

    $: current = curr(segment, href);
</script>

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
		box-shadow: inset 1px 1px 1em rgba(100, 100, 100, 0.4);
	}

</style>

<li>
    <a aria-current='{current}' href={href} rel="prefetch">
        <slot></slot>
    </a>
</li>
