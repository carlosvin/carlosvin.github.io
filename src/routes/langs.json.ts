import {store} from '../store';
import type { ServerResponse } from 'http';

export function get(req: Request, res: ServerResponse): void {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(store.langs));
}
