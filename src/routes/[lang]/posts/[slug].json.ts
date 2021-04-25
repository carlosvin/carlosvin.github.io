import { blogStore } from "$lib/stores/blog";

export async function get({params}) {
	const {lang, slug} = params;
	const post = blogStore.get(slug, lang);
	if (post) {
		return { body: { post } };
	}
}