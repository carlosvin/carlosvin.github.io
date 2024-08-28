import es from './locales/es';
import en from './locales/en';
import type { TranslationsInterface } from './locales/interface';

export class TranslationsStore {
	;
	private readonly _translations: Map<string, TranslationsInterface>;

	constructor(private readonly lang: string) {
		this._translations = new Map<string, TranslationsInterface>();
		// TODO implement lazy loading, for now it is not critical do to the small size of the translations
		this._translations.set(en.lang, en);
		this._translations.set(es.lang, es);
	}

	get current(): TranslationsInterface {
		return this._translations.get(this.lang) ?? en;
	}

	get langs(): string[] {
		return [...this._translations.keys()];
	}
}
