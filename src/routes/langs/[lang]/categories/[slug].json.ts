import type { HeadInfo, IndexResponse, PostProps } from '$lib/models/interfaces';
import { blogStore } from '$lib/stores/blog';
import type { LoadInput } from '@sveltejs/kit';

interface CategoryResponse {
	body: IndexResponse<PostProps> & HeadInfo;
}

export async function get({ params }: LoadInput): Promise<CategoryResponse> {
	const { lang, slug } = params;
	const category = blogStore.categories.get(slug);
	const posts = [...blogStore.getByCategory(slug, lang)];
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
