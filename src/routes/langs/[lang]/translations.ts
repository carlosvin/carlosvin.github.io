import type { Translations } from '$lib/models/interfaces';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import { loadTranslations } from '$lib/services/translations-loader';

declare type Resp = { body: Translations} | { status: number };

export function get({ params }: ServerRequest): Resp {
	const { lang } = params;
	if (lang === undefined) {
		return { status: 400 };
	}
	return {body: loadTranslations(lang)};
}
