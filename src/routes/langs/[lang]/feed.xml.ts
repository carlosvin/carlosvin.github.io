import { Atom } from '$lib/services/atom';
import { blogStore } from '$lib/stores/blog';
import { i18n } from '$lib/stores/lang';
import type { EndpointOutput, LoadInput } from '@sveltejs/kit';

export function get({ params }: LoadInput): EndpointOutput {
	const { lang } = params;
	const posts = blogStore.getByLang(lang);

	const { xml } = new Atom(
		i18n.get('siteName'),
		i18n.get('siteDescription'),
		posts,
		import.meta.env.VITE_BASE_URL,
		'',
		i18n.get('author')
	);

	return {
		headers: {
			'Cache-Control': 'max-age=0, s-max-age=3600',
			'Content-Type': 'application/xml'
		},
		body: xml
	};
}
