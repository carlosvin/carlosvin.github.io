<script context="module" lang="ts">
  
	export async function load({ page, fetch }) {
		const resp: IndexResponse<PostProps> = await (await fetch(`${page.path}.json`)).json();
		return {props: resp};
	}
  </script>
  
  <script lang="ts">
	import type { IndexResponse, PostProps } from "$lib/models/interfaces";
	import Index from "$lib/components/posts/Index.svelte";
  
    export let index: PostProps[];
    export let title: string;
    export let description: string;
  </script>
  
  <svelte:head>
	<title>{`Posts related with ${title}`}</title>
	<meta name="description" content="{description}" />
  </svelte:head>
  
  <Index posts={index} {title}/>