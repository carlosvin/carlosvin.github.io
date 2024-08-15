<script lang="ts">
	import Comments from './Comments.svelte';
	import './Content.css';
	
	export let content: string;
</script>

<div class="postContent">
	{@html content}
	<Comments />
</div>
