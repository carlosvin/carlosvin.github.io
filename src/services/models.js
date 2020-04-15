import { BASE_BLOG_PATH } from '../conf';

export function path({slug, lang}) {
    return `${BASE_BLOG_PATH}/${slug}/${lang}`;    
}