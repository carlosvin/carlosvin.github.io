import { BLOG_BASE_PATH, BASE_URL } from '../conf';

export function path(slug, lang = '') {
    if (lang) {
        return `/${BLOG_BASE_PATH}/${slug}/${lang}`;    
    } else {
        return `/${BLOG_BASE_PATH}/${slug}`;
    }
}

export function url(slug, lang = ''){
    return `${BASE_URL}${path(slug, lang)}`;
}
