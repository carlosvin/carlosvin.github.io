<script context="module" lang="ts">
	declare type Page = { params: { lang: string } };

	export async function load({ params }: Page): Promise<{ props: { lang: string } }> {
		return { props: params };
	}
</script>

<script lang="ts">
	export let lang: string;
</script>

<p>RSS {lang}</p>
