import {store} from '../../store';
import {replyStr} from '../../services/http';
import type { ServerResponse } from 'http';
import { jsonLdPost } from '../../services/jsonld';

export function get(req: {params:{slug: string[]}}, res: ServerResponse): void {
	const [slug, lang]  = req.params.slug;
	const post = store.get(slug, lang);
	replyStr(res, jsonLdPost(post.entry), lang);
}
