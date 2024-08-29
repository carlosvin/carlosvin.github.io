import { DEFAULT_LANG } from '$lib/conf';
import type { Category, PostProps } from '$lib/models/interfaces';
import { getIsoDate } from '$lib/services/dates';
import { categoryPath, postPath, url } from '$lib/services/url';
import { blogStore } from '$lib/stores/blog';

export const prerender = true;

function urlPage(page: string, lang: string) {
	return `
    <url>
        <loc>${import.meta.env.VITE_BASE_URL}/${page.replace('[lang]', lang)}</loc>
        <priority>0.6</priority>
    </url>`;
}
function linkLang(path: string, lang: string): string {
	return `<xhtml:link 
				rel="alternate"
				hreflang="${lang}"
				href="${url(path)}"/>`;
}

function urlPost({ slug, lang, modified, otherLangs }: PostProps) {
	return `
		<url>
            <loc>${url(postPath(slug, lang))}</loc>
            <priority>0.9</priority>
            <lastmod>${getIsoDate(new Date(modified))}</lastmod>
            ${otherLangs ? otherLangs.map((l) => linkLang(postPath(slug, l), l)) : ''}
		</url>`;
}

function urlCategory(name: string, langs: string[]) {
	return `
		<url>
            <loc>${url(categoryPath(name, langs.shift() ?? ''))}</loc>
            <priority>0.8</priority>
            ${langs ? langs.map((l) => linkLang(categoryPath(name, l), l)) : ''}
		</url>`;
}

const routes = [
	'/langs/es/categories',
	'/langs/en/categories',
	'/langs/en/about',
	'/langs/es/about'
];

const render = (pages: string[], posts: PostProps[], categories: Category[]) => `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
	${blogStore.langs.map((lang) => pages.map((page) => urlPage(page, lang))).join('\r\n')}
  	${posts
			.filter(({ modified }) => modified && !isNaN(modified))
			.map((post) => urlPost(post))
			.join('\r\n')}
    ${categories.map((category) => urlCategory(category.slug, blogStore.langs)).join('\r\n')}
</urlset>`;

export function GET() {
	return new Response(
		render(routes, blogStore.getIndex(DEFAULT_LANG), [...blogStore.categories.values()]),
		{
			headers: {
				'Cache-Control': 'max-age=0, s-max-age=3600',
				'Content-Type': 'application/xml'
			}
		}
	);
}
