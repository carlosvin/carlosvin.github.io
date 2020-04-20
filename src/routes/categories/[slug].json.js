import {store} from '../../store';

export function get(req, res, next) {
	const {slug}  = req.params;
	const category = store.categories.get(slug);
	const posts = store.getByCategory(slug);
	if (category) {
		const code = 200;
		res.writeHead(code, {
			'Content-Type': 'application/json'
		});
		res.end(JSON.stringify({category, posts}));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}
