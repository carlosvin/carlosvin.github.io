import { BASE_BLOG_PATH, BASE_URL } from '../conf';

export function path({slug, lang}) {
    return `${BASE_BLOG_PATH}/${slug}/${lang}`;    
}

export function url(post){
    return `${BASE_URL}${path(post)}`;
}
