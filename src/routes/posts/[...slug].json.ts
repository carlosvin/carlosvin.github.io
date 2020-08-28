import {store} from '../../store';
import {reply} from '../../services/http';
import type { ServerResponse } from 'http';

export function get(req: {params:{slug: string[]}}, res: ServerResponse): void {
	const [slug, lang]  = req.params.slug;
	const post = store.get(slug, lang);
	reply(res, post, lang);
}
