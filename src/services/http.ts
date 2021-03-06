import type { ServerResponse } from "http";
import { DEFAULT_LANG } from "../conf";

const DEFAULT_HEADERS = {'Content-Type': 'application/json'};

// eslint-disable-next-line 
export function reply(res: ServerResponse, obj: any, lang = DEFAULT_LANG): void {
	if (obj) {
		replyStr(res, JSON.stringify(obj), lang);
	} else {
		res.writeHead(404, DEFAULT_HEADERS);
		res.end(`{"message": "Not found"}`);
	}
}
export function replyStr(res: ServerResponse, obj: string, lang = DEFAULT_LANG): void {
	res.writeHead(200, {
		...DEFAULT_HEADERS,
		'Content-Language': lang,
	});
	res.end(obj);
}
