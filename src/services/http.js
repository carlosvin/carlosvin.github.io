import { DEFAULT_LANG } from "../conf";

const DEFAULT_HEADERS = {'Content-Type': 'application/json'};

export function reply(res, obj, lang = DEFAULT_LANG) {
	if (obj) {
		res.writeHead(200, {
			...DEFAULT_HEADERS,
			'Content-Language': lang,
		});
		res.end(JSON.stringify(obj));
	} else {
		res.writeHead(404, DEFAULT_HEADERS);
		res.end(JSON.stringify({message: `Not found`}));
	}
}
