import {store} from '../../store';

export function get(req, res, next) {
	const [slug, lang]  = req.params.slug;
	const post = store.get(slug, lang);
	if (post) {
		res.writeHead(200, {
			'Content-Type': 'application/json',
			'Content-Language': post.lang,
		});
		res.end(JSON.stringify(post));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}
