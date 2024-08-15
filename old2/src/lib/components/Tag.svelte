<script lang="ts">
	import { toSlug } from '$lib/services/slug';
	import { categoryPath } from '$lib/services/url';

	export let title: string;
	export let lang: string;
</script>

<a href={categoryPath(toSlug(title), lang)} {title}>
	{title}
</a>

<style>
	a {
		text-decoration: none;
		margin: 3px;
		padding: 3px 4px;
		min-width: 48px;
		text-align: center;
		display: block;
		border-radius: 0.2em;
		box-shadow: 0em 0em 0.1em #777;
		background: #eee;
		white-space: nowrap;
		min-width: 48px;
	}

	a:hover {
		background: #ffe;
	}
</style>
