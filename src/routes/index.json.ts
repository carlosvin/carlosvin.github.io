import {store} from '../store';
import { getSiteName, getDescription } from "../services/lang";
import { jsonLdPage, jsonLdScript } from '../services/jsonld';
import type { ServerResponse } from 'http';

const name = getSiteName();
const description = getDescription();
const ldScript = jsonLdScript(jsonLdPage(name, description));

const indexData = JSON.stringify({
	ldScript,
	index: store.index,
	name,
	description,
	langs: store.langs
});

export function get(req: Request, res: ServerResponse): void {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(indexData);
}
