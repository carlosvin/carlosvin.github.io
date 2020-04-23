import { BLOG_BASE_PATH, BASE_URL } from '../conf';

export function path(slug, lang = '') {
    return `/${BLOG_BASE_PATH}/${slug}/${lang}`;    
}

export function url(post){
    return `${BASE_URL}${path(post)}`;
}
