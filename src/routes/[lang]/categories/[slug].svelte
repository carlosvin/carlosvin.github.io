<script context="module" lang="ts">
	import { categoryPath } from "$lib/services/url";
  
	export async function load({ params }) {
		const { lang, slug } = params;
		const resp: IndexResponse<PostProps> = await (await fetch(`${categoryPath(lang, slug)}.json`)).json();
		return resp;
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