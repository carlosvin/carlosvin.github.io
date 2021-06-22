import { BLOG_BASE_PATH, CATEGORIES_BASE_PATH } from "$lib/conf";


export function categoryPath(slug: string, lang: string): string{
    return `/langs/${lang}/${CATEGORIES_BASE_PATH}/${slug}`;
}

export function postPath(slug: string, lang: string): string{
    return `/langs/${lang}/${BLOG_BASE_PATH}/${slug}`;
}
