import { DEFAULT_LANG } from '$lib/conf';
import { loadTranslations } from '$lib/services/translations-loader';
import type { Translations } from '$lib/models/interfaces';
/*
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

export const lang = createLangStore();

export const i18n = derived(
	lang,
	$lang => new TranslatorImpl(loadTranslations($lang)),
);
*/

class TranslationsStore {
	private readonly _translations: Map<string, Translations>;
	private _lang: string;

	constructor() {
		this._translations = new Map<string, Translations>();
	}

	get(key: string): string {
		const tr = this._translations.get(this._lang);
		if (!tr) {
			throw new Error(`there are no translations for ${this._lang}`);
		}
		return tr[key] || key;
	}

	setLang(lang: string, translations: Translations) {
		if (this._lang !== lang) {
			this._lang = lang;
			this._translations.set(this._lang, translations);
		}
		return this;
	}

	get lang() {
		return this._lang;
	}

	get siteName () {
		return this.get('siteName');
	}

	get siteDescription () {
		return this.get('siteDescription');
	}
}

export const i18n = new TranslationsStore();
