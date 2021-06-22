import type { Category, IndexResponse } from "$lib/models/interfaces";
import { blogStore } from "$lib/stores/blog";
import { I18N } from "$lib/stores/lang";

const categories = [...blogStore.categories.values()];

declare type Resp = {body: IndexResponse<Category>} | {status: number};

export function get({params}): Resp {
	const {lang} = params;
	if (lang === undefined) {
		return {status: 400};
	}
	return {
		body: {
			index: categories,
			title: I18N.get(lang, 'siteName'),
			description: I18N.get(lang, 'siteDescription'),
			langs: blogStore.langs
		}
	};
}