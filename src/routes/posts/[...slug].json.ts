import {store} from '../../store';
import {reply} from '../../services/http';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function get(req, res): void {
	const [slug, lang]  = req.params.slug;
	const post = store.get(slug, lang);
	reply(res, post, lang);
}
