import type { IndexResponse, PostProps } from '$lib/models/interfaces';
import { blogStore } from '$lib/stores/blog';
import { I18N } from '$lib/stores/lang';

declare type Resp = { body: IndexResponse<PostProps> } | { status: number };

export function get({ params }): Resp {
	const { lang } = params;
	if (lang === undefined) {
		return { status: 400 };
	}
	const index = blogStore.getIndex(lang);
	return {
		body: {
			index: index,
			title: I18N.get(lang, 'siteName'),
			description: I18N.get(lang, 'siteDescription'),
			langs: blogStore.langs
		}
	};
}
