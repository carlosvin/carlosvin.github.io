<script>
  import OtherLangs from "./OtherLangs.svelte";
  import Tags from "../Tags.svelte";
  export let post;
</script>

<style>
.subtitle {
    font-size: small;
    font-family: 'Courier New', Courier, monospace;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
}
</style>

<div class='subtitle'>
    <span class="date">{new Date(post.date).toLocaleDateString()}</span>
    <OtherLangs {post}/>
    <Tags tagList={post.keywords}/>
</div>