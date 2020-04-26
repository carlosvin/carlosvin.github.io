import { url } from '../services/models';
import { getIsoDate } from '../services/dates';
import { store } from '../store';
import { BASE_URL } from '../conf';

const fs = require('fs');

const pages = [""];

fs.readdirSync("./src/routes").forEach(file => {
	file = file.split('.')[0];
	if (file.charAt(0) !== '_' && !file.startsWith("sitemap") && file !== "index") {
		pages.push(file);
	}
});

const render = (pages, posts) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
	${pages
		.map(page => `<url><loc>${BASE_URL}/${page}</loc><priority>0.85</priority></url>`)
		.join("\r\n")}
  	${posts.map(({ slug, lang, date, otherLangs}) => `
		<url>
		<loc>${url(slug, lang)}</loc>
		<priority>0.69</priority>
		<lastmod>${getIsoDate(new Date(date))}</lastmod>
		${otherLangs ? otherLangs.map(l => `<xhtml:link 
				rel="alternate"
				hreflang="${l}"
				href="${url(slug, l )}"/>`) : ''
			}
		</url>`).join("\r\n")}
</urlset>`;

export function get(req, res, next) {
	res.setHeader("Cache-Control", `max-age=0, s-max-age=${1800}`); // 30 minutes
	res.setHeader("Content-Type", "application/rss+xml");
	const sitemap = render(pages, store.index);
	res.end(sitemap);
}
