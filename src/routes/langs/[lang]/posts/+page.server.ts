import { blogStore } from '$lib/stores/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const { lang } = params;
	const index = blogStore.getIndex(lang);
	return {
		description: 'unknown',
		title: 'unknown',
		index: [...index.map((entry) => entry.serializable)],
		lang,
		langs: blogStore.langs
	};
};
