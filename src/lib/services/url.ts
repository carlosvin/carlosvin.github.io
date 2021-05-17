import { BLOG_BASE_PATH, CATEGORIES_BASE_PATH } from "$lib/conf";


export function categoryPath(lang: string, slug: string): string{
    return `${lang}/${CATEGORIES_BASE_PATH}/${slug}`;
}

export function postPath(slug: string, lang: string): string{
    return `/${lang}/${BLOG_BASE_PATH}/${slug}`;
}
