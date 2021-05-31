import { DEFAULT_LANG } from '$lib/conf';
import { TranslationsLoader } from '$lib/services/translations';
import { derived, writable, get } from 'svelte/store';

const loader = new TranslationsLoader();

export function getLang(navigator: Navigator) {
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

export const lang = createLangStore();

export const tr = derived(
	lang,
	$lang => {
		const translations = loader.get($lang);
		return {
			get: (key: string) => translations[key],
			siteName: translations['siteName'],
			siteDesc: translations['siteDescription'],
		};
	}
);

export function siteName(store): string {
	return get(store).siteName;
}

export function siteDesc(store): string {
	return get(store).siteDesc;
}
