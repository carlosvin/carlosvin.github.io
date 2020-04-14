import { store } from '../store';
import { BASE_URL } from '../conf';

const render = (langEntries) => `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${langEntries
		.map(([l, d]) => `
		<sitemap>
        	<loc>${BASE_URL}/sitemap-${l}.xml</loc>
        	<lastmod>${d}</lastmod>
		</sitemap>`)
		.join("\r\n")}
</sitemapindex>`;

export function get(req, res, next) {
	res.setHeader("Cache-Control", `max-age=0, s-max-age=${1800}`); // 30 minutes
	res.setHeader("Content-Type", "application/rss+xml");
	const sitemap = render(store.langEntries);
	res.end(sitemap);
}
