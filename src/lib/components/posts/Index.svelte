<script lang="ts">
	import Index from '../Index.svelte';
	import Entry from './Entry.svelte';
	import Search from '../Search.svelte';
	import Header from './Header.svelte';
	import type { PostProps } from '$lib/models/interfaces';

	export let posts: PostProps[];
	export let title: string | undefined = undefined;
	export let lang: string;

	let founds: PostProps[];
	let index: PostProps[];

	$: {
		index = founds ? founds : posts;
	}
</script>

<Header numPosts={index ? index.length : 0} {title} {lang}>
	<Search index={posts} bind:founds />
</Header>

<Index>
	{#each index as post}
		<Entry {post} />
	{/each}
</Index>
