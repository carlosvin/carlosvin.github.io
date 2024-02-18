<script lang="ts">
	import { i18n } from '$lib/stores/lang';

</script>

{#each i18n.langs as lang}
	<p><a href={`/langs/${lang}/posts`}>{lang}</a></p>
{/each}
