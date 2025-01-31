import { TranslationsStore } from '$lib/stores/lang';
import { redirect } from '@sveltejs/kit';

export const prerender = true;

export function load() {
	const userLang = navigator.language.slice(0, 2);

	throw redirect(307, `/langs/${TranslationsStore.getSupported(userLang)}/posts`);
}
