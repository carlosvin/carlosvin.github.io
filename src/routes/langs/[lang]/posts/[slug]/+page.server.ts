import { jsonLdPost } from '$lib/services/jsonld';
import { blogStore } from '$lib/stores/blog';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = ({ params }) => {
	const { html, props } = blogStore.get(params.slug, params.lang);
	return {
		html,
		props: { ...props, lang: params.lang },
		jsonLd: `<script type="application/ld+json">${jsonLdPost(props)}</script>`
	};
};
