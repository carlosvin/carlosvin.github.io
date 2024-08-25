import { blogStore } from '$lib/stores/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const { lang, slug } = params;
	const category = blogStore.categories.get(slug);
	const posts = [...blogStore.getByCategory(slug, lang).map(p => p.serializable)];
	if (category) {
		return {
				description: category.name,
				title: category.name,
				index: posts, //JSON.parse(JSON.stringify(posts)) as,
				langs: [lang]
		};
	}
	return {
		description: 'unknown',
		title: 'unknown',
		index: [],
		langs: [lang]
	}
};