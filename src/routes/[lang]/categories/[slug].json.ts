import type { IndexResponse, PostProps } from "$lib/models/interfaces";
import { blogStore } from "$lib/stores/blog";

interface CategoryResponse {
	body: IndexResponse<PostProps>
}

export async function get({ params }): Promise<CategoryResponse> {
	const { lang, slug } = params;
	const category = blogStore.categories.get(slug);
	const posts = [...blogStore.getByCategory(slug)];
	if (category) {
		return { 
			body: { 
				description: category.name, 
				title: category.name, 
				index: posts, 
				langs: [lang] 
			} 
		};
	}
}
