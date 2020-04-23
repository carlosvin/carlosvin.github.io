import { DEFAULT_LANG } from "../conf";

export function reply(res, obj, lang = DEFAULT_LANG) {
	if (obj) {
		const code = lang ? 200 : 301;
		res.writeHead(code, {
			'Content-Type': 'application/json',
			'Content-Language': lang,
		});
		res.end(JSON.stringify(obj));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}
