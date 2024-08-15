import type { Translations } from '$lib/models/interfaces';
import fs from 'fs';

export function loadTranslations(lang: string): Translations {
	const content = fs.readFileSync(`${import.meta.env.VITE_I18N_DIR}/${lang}.json`, 'utf-8');
	const translations: Translations = {};
	const loaded = JSON.parse(content);
	for (const key in loaded) {
		translations[key] = loaded[key].toString();
	}
	return translations;
}
