
<script>
    function curr(segment, href) {
        if (segment === undefined && href === '.') {
            return 'page';
        } else if (href.startsWith(segment)) {
            return 'page';
        } else {
            return undefined;
        }
    }

    export let segment;
    export let href;


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
	}
    
	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}
</style>

<li>
    <a aria-current='{current}' {href}>
        <slot></slot>
    </a>
</li>
