import { DEFAULT_LANG } from '$lib/conf';
import { Translations, TranslationsLoader } from '$lib/services/translations';
import { derived, writable } from 'svelte/store';

export function getLang(navigator: Navigator): string {
	return navigator.language.substring(0,2);
}

function createLangStore() {
	const { subscribe, set } = writable(DEFAULT_LANG);

	return {
		subscribe,
		change: (navigator: Navigator) => {
            const newLang = getLang(navigator);
            if (navigator && newLang.length >= 2) {
                set(newLang);
            }
        },
	};
}


function createTranslatorStore() {
	let translations: Translations;
	const { subscribe } = derived(
		lang,
		$lang => translations = TranslationsLoader.get($lang)
	);

	return {
		subscribe,
		get: (key: string) => translations[key],
		siteName: () => translations && translations['siteName'],
		siteDesc: () => translations && translations['siteDescription']
	};
}

export const lang = createLangStore();

export const tr = createTranslatorStore();
