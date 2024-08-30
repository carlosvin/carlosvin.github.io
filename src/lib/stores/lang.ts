import es from './locales/es';
import en from './locales/en';
import type { TranslationsInterface } from './locales/interface';

/**
 * Store for translations
 */
const translations = new Map<string, TranslationsInterface>([
	[en.lang, en],
	[es.lang, es]
]);

export class TranslationsStore {
	constructor(private readonly lang: string) {
		// TODO implement lazy loading, for now it is not critical do to the small size of the translations
	}

	get current(): TranslationsInterface {
		return translations.get(this.lang) ?? en;
	}

	get langs(): string[] {
		return [...translations.keys()];
	}

	static get defaultLang(): string {
		return en.lang;
	}

	/**
	 * @param lang input language to check if it is supported
	 * @returns the input language or a supported language
	 */
	static getSupported(lang: string): string {
		return translations.has(lang) ? lang : this.defaultLang;
	}
}
