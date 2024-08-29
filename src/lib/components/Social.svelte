<script>
	import IconLink from './IconLink.svelte';
	export let horizontal = true;
</script>

<div class={horizontal ? 'h' : 'v'}>
	<slot />
	<IconLink href="https://github.com/carlosvin" icon="github" />
	<IconLink href="https://stackoverflow.com/users/1421059/carlosvin" icon="stackoverflow" />
</div>

<style>
	div {
		display: flex;
		vertical-align: middle;
	}

	.h {
		flex-flow: row;
	}

	.v {
		flex-flow: column;
	}
</style>
