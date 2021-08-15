import type { Post } from '$lib/models/interfaces';
import { blogStore } from '$lib/stores/blog';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

export function get({ params }: ServerRequest): { body: Post } {
	const { lang, slug } = params;
	const { html, props } = blogStore.get(slug, lang);

	return { body: { html, props } };
}
