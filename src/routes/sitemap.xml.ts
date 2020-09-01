import { url } from '../services/url';
import { getIsoDate } from '../services/dates';
import { store } from '../store';
import { BASE_URL } from '../conf';
import fs from 'fs';
import type { ServerResponse } from 'http';
import type { IndexEntry } from '../services/interfaces';

const pages = [""];

fs.readdirSync("./src/routes").forEach(file => {
	file = file.split('.')[0];
	if (file.charAt(0) !== '_' && !file.startsWith("sitemap") && file !== "index" && !file.startsWith("[lang]")) {
		pages.push(file);
	}
});

function linkLang (slug: string, lang: string): string {
	return `<xhtml:link 
				rel="alternate"
				hreflang="${lang}"
				href="${url(slug, lang )}"/>`;
}

const render = (pages: string[], posts: IndexEntry[]) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
	${pages
		.map(page => `<url><loc>${BASE_URL}/${page}</loc><priority>0.6</priority></url>`)
		.join("\r\n")}
  	${posts.map(({ slug, lang, modified, otherLangs}) => `
		<url>
		<loc>${url(slug, lang)}</loc>
		<priority>0.9</priority>
		<lastmod>${getIsoDate(new Date(modified))}</lastmod>
		${otherLangs ? otherLangs.map(l => linkLang(slug, l)) : '' }
		</url>`).join("\r\n")}
</urlset>`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function get(req: unknown, res: ServerResponse): void {
	res.setHeader("Cache-Control", 'max-age=0, s-max-age=3600'); // 30 minutes
	res.setHeader("Content-Type", "application/xml");
	const sitemap = render(pages, store.index);
	res.end(sitemap);
}
