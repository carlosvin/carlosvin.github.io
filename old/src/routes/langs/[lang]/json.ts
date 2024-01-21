import type { IndexResponse, PostProps } from '$lib/models/interfaces';
import { blogStore } from '$lib/stores/blog';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

declare type Resp = { body: IndexResponse<PostProps> } | { status: number };

export function get({ params }: ServerRequest): Resp {
	const { lang } = params;
	if (lang === undefined) {
		return { status: 400 };
	}
	const index = blogStore.getIndex(lang);
	return {
		body: {
			index: index,
			langs: blogStore.langs
		}
	};
}
