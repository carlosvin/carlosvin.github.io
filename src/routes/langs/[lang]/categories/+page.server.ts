import { blogStore } from '$lib/stores/blog';
import { TranslationsStore } from '$lib/stores/lang';
import type { PageServerLoad } from './$types';
export const prerender = true;
export const load: PageServerLoad = ({ params }) => {
	return {
		index: [...blogStore.categories.values()],
		langs: blogStore.langs,
		lang: params.lang,
		translations: new TranslationsStore(params.lang).current
	};
};
