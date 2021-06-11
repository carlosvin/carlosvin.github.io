import type { Category, IndexResponse } from "$lib/models/interfaces";
import { blogStore } from "$lib/stores/blog";
import { tr } from "$lib/stores/lang";

const categories = [...blogStore.categories.values()];
	
export async function get({params}): Promise<{body: IndexResponse<Category>}> {
	const {lang} = params;
	return {
		body: {
			index: categories,
			title: tr.get(lang, 'siteName'),
			description: tr.get(lang, 'siteDesc'),
			langs: blogStore.langs
		}
	};
}