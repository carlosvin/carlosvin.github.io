<script lang="ts">
	export let href: string;
	export let target = '_blank';
	export let icon = 'github';
	export let title = `Find me at ${icon}`;
	let rel = target === '_blank' ? 'noopener' : undefined;
</script>

<a {href} {target} class="icon {icon}" {title} {rel} aria-label={title}>
	<slot />
</a>

<style>
	.twitter::before {
		content: '\ea96';
	}
	.rss::before {
		content: '\ea9b';
	}
	.github::before {
		content: '\eab0';
	}
	.stackoverflow::before {
		content: '\ead0';
	}
	.icon {
		font-family: 'icomoon' !important;
		padding: 1em;
	}
	a {
		text-decoration: none;
	}
	a:hover {
		color: darkblue;
	}
	a:focus {
		color: blue;
	}
</style>
