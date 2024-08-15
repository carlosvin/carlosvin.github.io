// @ts-nocheck
import { i18n } from '$lib/stores/lang';
import type { LayoutServerLoad } from './$types';

export const load = async ({params, url}: Parameters<LayoutServerLoad>[0]) => {
	const { lang } = params;
	if (lang && (lang !== i18n.lang || i18n.lang === undefined)) {
		i18n.setLang(lang);
		if (typeof document !== 'undefined') {
			document.documentElement.lang = lang;
		}
	}
	return  { path: url.pathname, lang, siteName: i18n.siteName };
};
