
<script>
import Badge from './Badge.svelte'
import {toSlug} from '../services/slug';
import {categoryPath} from '../services/url';

export let title;
</script>

<style>
a {
    text-decoration: none;
    margin: 0.2em;
}
</style>

<a href="{categoryPath(toSlug(title))}" {title}>
    <Badge>{title}</Badge>
</a>
