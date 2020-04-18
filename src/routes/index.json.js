import {store} from '../store';

const contents = JSON.stringify(store.index);

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}
