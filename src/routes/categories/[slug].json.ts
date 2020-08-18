import {store} from '../../store';
import {reply} from '../../services/http';
import type { ServerResponse } from 'http';

export function get(req: {params:{slug: string}}, res: ServerResponse): void {
	const {slug}  = req.params;
	const category = store.categories.get(slug);	
	const posts = [...store.getByCategory(slug)];
	const obj = category ? {category, posts} : undefined;
	reply(res, obj);
}
