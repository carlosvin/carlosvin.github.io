import { DEFAULT_LANG } from '$lib/conf';
import type { PostProps } from '$lib/models/interfaces';
import { getIsoDate } from '$lib/services/dates';
import { postPath } from '$lib/services/url';
import { blogStore } from '$lib/stores/blog';
import { routes } from '$lib/stores/routes';

function url(slug:string, lang:string) {
    return import.meta.env.VITE_BASE_URL + postPath(slug, lang);
}

function linkLang(slug: string, lang: string): string {
    return `<xhtml:link 
				rel="alternate"
				hreflang="${lang}"
				href="${url(slug, lang)}"/>`;
}

const render = (pages: string[], posts: PostProps[]) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
	${pages
        .map(page => `<url><loc>${import.meta.env.VITE_BASE_URL}/${page}</loc><priority>0.6</priority></url>`)
        .join("\r\n")}
  	${posts
        .filter(({ modified }) => modified && !isNaN(modified))
        .map(({ slug, lang, modified, otherLangs }) => `
		<url>
		<loc>${url(slug, lang)}</loc>
		<priority>0.9</priority>
		<lastmod>${getIsoDate(new Date(modified))}</lastmod>
		${otherLangs ? otherLangs.map(l => linkLang(slug, l)) : ''}
		</url>`).join("\r\n")}
</urlset>`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function get(): unknown {
    return {
        headers: {
            'Cache-Control': 'max-age=0, s-max-age=3600',
            'Content-Type': 'application/xml',
        },
        body: render(routes, blogStore.getIndex(DEFAULT_LANG)),
    };
}
