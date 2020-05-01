<script>
  import OtherLangs from "./OtherLangs.svelte";
  export let post;
</script>

<style>
.subtitle {
    font-size: small;
    font-family: 'Courier New', Courier, monospace;
}
</style>

<div class='subtitle'>
    <span class="date">{new Date(post.date).toLocaleDateString()}</span>
    <OtherLangs {post}/>
</div>