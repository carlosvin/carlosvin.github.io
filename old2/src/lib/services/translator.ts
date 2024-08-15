import type { Translations, Translator } from '$lib/models/interfaces';

export class TranslatorImpl implements Translator {
	private readonly translations: Translations;

	constructor(translations: Translations) {
		this.translations = translations;
	}

	get(key: string): string {
		return this.translations[key] || key;
	}
}
