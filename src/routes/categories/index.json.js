import {store} from '../../store';

const categories = JSON.stringify([...store.categories.entries()]);

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});
	res.end(categories);
}
