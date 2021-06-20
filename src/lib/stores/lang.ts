import { DEFAULT_LANG } from '$lib/conf';
import { Translations, TranslationsLoader } from '$lib/services/translations';
import { writable } from 'svelte/store';

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
		set
	};
}

class Translator {

	private readonly translations: Map<string, Translations>;

	constructor() {
		this.translations = new Map();
	}

	get(lng: string, key: string) {
		let translationMap: Translations = this.translations.get(lng);
		if (translationMap === undefined) {
			translationMap = TranslationsLoader.get(lng);
			this.translations.set(lng, translationMap);
		}
		return translationMap[key] || key;
	}
}

export const lang = createLangStore();
export const I18N = new Translator();