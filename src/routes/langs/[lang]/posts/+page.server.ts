import { blogStore } from '$lib/stores/blog';
import { TranslationsStore } from '$lib/stores/lang';
import type { EntryGenerator, PageServerLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => blogStore.entries;

export const load: PageServerLoad = ({ params }) => {
	const { lang } = params;
	const index = blogStore.getIndex(lang);
	return {
		index: [...index.map((entry) => entry.serializable)],
		translations: new TranslationsStore(lang).current
	};
};
