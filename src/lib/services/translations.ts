

export interface Translations {
    [key: string]: string;
}

export class TranslationsLoader {
    private readonly _translations: Map<string, Translations>;
    private static _instance: TranslationsLoader;

    private constructor() {
        this._translations = new Map<string, Translations>();
        const files = import.meta.globEager('../../../locales/*.json');
        for (const f in files) {
            const content = files[f];
            this._translations.set(content.lang, content);
        }
    }

    static get (lang: string): Translations {
        return this.instance()._translations.get(lang);
    }

    static instance(): TranslationsLoader {
        if (this._instance === undefined) {
            this._instance = new TranslationsLoader();
        }
        return this._instance;
    }
}
