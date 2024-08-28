<script lang="ts">
	import Index from '../Index.svelte';
	import Entry from './Entry.svelte';
	import Search from '../Search.svelte';
	import Header from './Header.svelte';
	import type { PostProps } from '$lib/models/interfaces';
	import type { TranslationsInterface } from '$lib/stores/locales/interface';

	export let posts: PostProps[];
	export let translations: TranslationsInterface;
	export let title: string | undefined = undefined;

	let founds: PostProps[];
	let index: PostProps[];

	$: {
		index = founds ? founds : posts;
	}
</script>

<Header numPosts={index?.length ?? 0} {translations} {title}>
	<Search index={posts} bind:founds />
</Header>

<Index>
	{#each index as post}
		<Entry {post} />
	{/each}
</Index>
