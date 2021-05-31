
import path from "path";

interface Translations {
    [key: string]: string;
}

export class TranslationsLoader {
    private readonly _translations: Map<string, Translations>;

    constructor() {
        this._translations = new Map<string, Translations>();
        const files = import.meta.globEager('../../../locales/*.json');
        for (const f in files) {
            const lang = path.basename(f, 'json').slice(0, -1);
            this._translations.set(lang, files[f]);
        }
    }

    get (lang: string): Translations {
        return this._translations.get(lang);
    }
}
