const BLOG_BASE_PATH = 'posts';
const CATEGORIES_BASE_PATH = 'categories';

// generates category URL path
export function categoryPath(slug: string, lang: string): string {
	return `/langs/${lang}/${CATEGORIES_BASE_PATH}/${slug}`;
}

// generates post URL path
export function postPath(slug: string, lang: string): string {
	return `/langs/${lang}/${BLOG_BASE_PATH}/${slug}`;
}

// generates the post URL
export function postUrl(slug: string, lang: string): string {
	return url(postPath(slug, lang));
}

// converts any path to a full URL
export function url(path: string): string {
	return import.meta.env.VITE_BASE_URL + path;
}
