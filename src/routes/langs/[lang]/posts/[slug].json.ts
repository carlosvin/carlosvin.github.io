import type { Post } from '$lib/models/interfaces';
import { blogStore } from '$lib/stores/blog';

export async function get({ params }): Promise<{ body: Post }> {
	const { lang, slug } = params;
	const post = blogStore.get(slug, lang);
	if (post) {
		const { props, html } = post;
		return { body: { props, html } };
	}
}
