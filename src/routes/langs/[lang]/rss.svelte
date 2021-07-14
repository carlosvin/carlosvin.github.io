<script context="module" lang="ts">
	export async function load({fetch, page}): Promise<{props: {lang: string}}> {
		const {lang} = page.params;
		return { props: {lang} };
	}
</script>

<script lang="ts">
	export let lang: string;
</script>

<p>RSS {lang}</p>
