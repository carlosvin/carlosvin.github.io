import { blogStore } from '$lib/stores/blog';
import { TranslationsStore } from '$lib/stores/lang';
import type { PageServerLoad } from './$types';
export const prerender = true;
export const load: PageServerLoad = ({ params }) => {
	const { lang, slug } = params;
	const category = blogStore.categories.get(slug);
	/*const posts = [...blogStore.getByCategory(slug, lang).map((p) => p.serializable)];
	if (category) {
		return {
			description: category.name,
			title: category.name,
			index: posts, //JSON.parse(JSON.stringify(posts)) as,
			langs: [lang],
			translations: new TranslationsStore(lang).current
	
		};
	}*/
	return {
		description: 'unknown',
		title: 'unknown',
		index: [],
		langs: [lang],
		translations: new TranslationsStore(lang).current
	};
};
