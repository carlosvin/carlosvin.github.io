import type { Category, IndexResponse } from "$lib/models/interfaces";
import { blogStore } from "$lib/stores/blog";
import { siteDesc, siteName, tr } from "$lib/stores/lang";

const categories = [...blogStore.categories.values()];
	
export async function get(): Promise<{body: IndexResponse<Category>}> {
	return {
		body: {
			index: categories,
			title: siteName(tr),
			description: siteDesc(tr),
			langs: blogStore.langs
		}
	};
}