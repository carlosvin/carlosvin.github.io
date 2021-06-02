import type { Category, IndexResponse } from "$lib/models/interfaces";
import { blogStore } from "$lib/stores/blog";
import { tr } from "$lib/stores/lang";

const categories = [...blogStore.categories.values()];
	
export async function get(): Promise<{body: IndexResponse<Category>}> {
	return {
		body: {
			index: categories,
			title: tr.siteName(),
			description: tr.siteDesc(),
			langs: blogStore.langs
		}
	};
}