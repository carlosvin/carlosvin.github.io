import { BASE_URL, BLOG_BASE_PATH, CATEGORIES_BASE_PATH } from "$lib/conf";

export function path(slug: string, lang = ''): string {
    if (lang) {
        return `/${BLOG_BASE_PATH}/${slug}/${lang}`;    
    } else {
        return `/${BLOG_BASE_PATH}/${slug}`;
    }
}

export function url(slug: string, lang = ''): string{
    return `${BASE_URL}${path(slug, lang)}`;
}

export function categoryPath(slug: string): string{
    return `/${CATEGORIES_BASE_PATH}/${slug}`;
}
