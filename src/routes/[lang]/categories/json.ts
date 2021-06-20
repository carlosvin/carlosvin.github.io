import type { Category, IndexResponse } from "$lib/models/interfaces";
import { blogStore } from "$lib/stores/blog";
import { I18N } from "$lib/stores/lang";

const categories = [...blogStore.categories.values()];
	
export async function get({params}): Promise<{body: IndexResponse<Category>}> {
	const {lang} = params;
	return {
		body: {
			index: categories,
			title: I18N.get(lang, 'siteName'),
			description: I18N.get(lang, 'siteDescription'),
			langs: blogStore.langs
		}
	};
}