import { TranslationsStore } from '$lib/stores/lang';
import type { LayoutServerLoad } from './$types';


//export const prerender = true;


export const load: LayoutServerLoad = async ({ params, url }) => {
	const { lang } = params;
	if (lang && typeof document !== 'undefined') {
		document.documentElement.lang = lang;
	}
	return { path: url.pathname, lang, translations: new TranslationsStore(lang).current };
};
