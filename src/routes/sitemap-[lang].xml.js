import { store } from '../store';
import { BASE_URL } from '../conf';
const fs = require('fs');

const pages = [""];

fs.readdirSync("./src/routes").forEach(file => {
	file = file.split('.')[0];
	if (file.charAt(0) !== '_' && !file.startsWith("sitemap")  && file !== "index") {
		pages.push(file);
	}
});

const render = (pages, posts) => `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
		.map(
			page => `
    <url><loc>${BASE_URL}/${page}</loc><priority>0.85</priority></url>
  `
		)
		.join("\n")}
  ${posts
		.map(({slug, lang, date}) => `
    <url>
      <loc>${BASE_URL}/blog/${slug}/${lang}</loc>
	  <priority>0.69</priority>
	  <lastmod>${date}</lastmod>
    </url>
  `)
		.join("\n")}
</urlset>
`;

export function get(req, res, next) {
	res.setHeader("Cache-Control", `max-age=0, s-max-age=${1800}`); // 30 minutes
	res.setHeader("Content-Type", "application/rss+xml");
	const lang  = req.params.lang;
	const sitemap = render(pages, store.getByLang(lang));
	res.end(sitemap);
}
