
<script lang="ts">
import Badge from '$lib/components/Badge.svelte'
import {toSlug} from '$lib/services/slug';
import {categoryPath} from '$lib/services/url';

export let title: string;
export let lang: string;
</script>

<style>
a {
    text-decoration: none;
    margin: 0.2em;
}
</style>

<a href="{categoryPath(toSlug(title), lang)}" {title}>
    <Badge>{title}</Badge>
</a>
