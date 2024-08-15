// @ts-nocheck

import { blogStore } from '$lib/stores/blog';
import type { PageServerLoad } from './$types';

export const load = ({params}: Parameters<PageServerLoad>[0]) => {
	return {
		index: [...blogStore.categories.values()],
		langs: blogStore.langs,
		lang: params.lang
	};
};
