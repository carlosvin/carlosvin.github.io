import { getSiteName, getDescription } from "../services/lang";
import { jsonLdPage } from '../services/jsonld';
import type { ServerResponse } from 'http';
import { replyStr } from '../services/http';

const name = getSiteName();
const description = getDescription();

const jsonLd = jsonLdPage(name, description);

export function get(req: Request, res: ServerResponse): void {
	replyStr(res, jsonLd);
}
