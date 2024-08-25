import { blogStore } from '$lib/stores/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	return {
		index: [...blogStore.categories.values()],
		langs: blogStore.langs,
		lang: params.lang
	};
};
