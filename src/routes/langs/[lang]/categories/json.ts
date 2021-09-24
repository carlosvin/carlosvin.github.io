import type { Category, IndexResponse } from '$lib/models/interfaces';
import { blogStore } from '$lib/stores/blog';
import { i18n } from '$lib/stores/lang';

const categories = [...blogStore.categories.values()];

declare type Resp = { body: IndexResponse<Category> } | { status: number };

export function get({ params }): Resp {
	const { lang } = params;
	if (lang === undefined) {
		return { status: 400 };
	}
	return {
		body: {
			index: categories,
			title: i18n.get('siteName'),
			description: i18n.get('siteDescription'),
			langs: blogStore.langs
		}
	};
}
