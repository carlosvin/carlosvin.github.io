import type { Post } from '$lib/models/interfaces';
import { blogStore } from '$lib/stores/blog';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

export function get({ params }: ServerRequest): { body: Post } {
	const { lang, slug } = params;
	const post = blogStore.get(slug, lang);
	if (post) {
		return { body: post };
	}
}
