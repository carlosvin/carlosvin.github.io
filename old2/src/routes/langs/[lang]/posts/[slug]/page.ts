import { blogStore } from '$lib/stores/blog';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    const { lang, slug } = params;
    return blogStore.get(slug, lang);

};