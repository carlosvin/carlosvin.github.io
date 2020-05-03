
<script>
import Badge from './Badge.svelte'
export let title;
export let href;
</script>

<style>
a {
    text-decoration: none;
}

</style>

<a {href} {title}>
    <Badge>{title}</Badge>
</a>
