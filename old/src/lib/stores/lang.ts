import type { Translations } from '$lib/models/interfaces';

export class TranslationsStore {
	private readonly _translations: Map<string, Translations>;
	private _lang: string;

	constructor() {
		this._translations = new Map<string, Translations>();
		const loaded = import.meta.globEager('/static/locales/*.json');
		for (const filename in loaded) {
			const lang = filename.split('.').slice(0, -1).join('.').replace('/static/locales/', '');
			this._translations.set(lang, loaded[filename]);
		}
	}

	get(key: string): string {
		const tr = this._translations.get(this._lang);
		if (!tr) {
			throw new Error(`there are no translations for ${this._lang}`);
		}
		return tr[key] || key;
	}

	setLang(lang: string): TranslationsStore {
		if (this._lang !== lang) {
			this._lang = lang;
		}
		return this;
	}

	get lang(): string {
		return this._lang;
	}

	get siteName(): string {
		return this.get('siteName');
	}

	get siteDescription(): string {
		return this.get('siteDescription');
	}

	get langs(): IterableIterator<string> {
		return this._translations.keys();
	}
}
export const i18n = new TranslationsStore();
