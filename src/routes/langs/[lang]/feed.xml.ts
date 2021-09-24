import { Atom } from '$lib/services/atom';
import { blogStore } from '$lib/stores/blog';
import { i18n } from '$lib/stores/lang';
import {get as g} from 'svelte/store';

export function get({ params }) {
	const { lang } = params;
	const posts = blogStore.getByLang(lang);
	
	const { xml } = new Atom(
		g(i18n).get('siteName'),
		g(i18n).get('siteDescription'),
		posts,
		import.meta.env.VITE_BASE_URL,
		'',
		g(i18n).get('author')
	);

	return {
		headers: {
			'Cache-Control': 'max-age=0, s-max-age=3600',
			'Content-Type': 'application/xml'
		},
		body: xml
	};
}
