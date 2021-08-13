import { Atom } from '$lib/services/atom';
import { blogStore } from '$lib/stores/blog';
import { I18N } from '$lib/stores/lang';

export function get({ params }) {
	const { lang } = params;
	const posts = blogStore.getByLang(lang);
	const { xml } = new Atom(
		I18N.get(lang, 'siteName'),
		I18N.get(lang, 'siteDescription'),
		posts,
		import.meta.env.VITE_BASE_URL,
		'',
		I18N.get(lang, 'author')
	);

	return {
		headers: {
			'Cache-Control': 'max-age=0, s-max-age=3600',
			'Content-Type': 'application/xml'
		},
		body: xml
	};
}
