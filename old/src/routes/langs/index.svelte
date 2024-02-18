<script lang="ts">
	import { i18n } from '$lib/stores/lang';

	let langs = [...i18n.langs];
</script>

{#each langs as lang}
	<p><a href={`/langs/${lang}/posts`}>{lang}</a></p>
{/each}
