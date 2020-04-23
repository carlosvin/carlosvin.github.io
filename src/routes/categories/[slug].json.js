import {store} from '../../store';
import {reply} from '../../services/http';
import { DEFAULT_LANG } from '../../conf';

export function get(req, res, next) {
	const {slug}  = req.params;
	const category = store.categories.get(slug);
	const posts = store.getByCategory(slug);
	const obj = category ? {category, posts} : undefined;
	// TODO consider adding lang for categories
	reply(res, obj, DEFAULT_LANG);
}
