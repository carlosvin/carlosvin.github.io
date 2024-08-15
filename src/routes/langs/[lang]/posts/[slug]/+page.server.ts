
import { blogStore } from '$lib/stores/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {

    const { html, props } = blogStore.get(params.slug, params.lang);
    console.log('load', params.slug, params.lang, props);
    return { html, props: { ...props, lang: params.lang } }
};