import {store} from '../../store';
import {reply} from '../../services/http';

export function get(req, res) {
	const [slug, lang]  = req.params.slug;
	const post = store.get(slug, lang);
	reply(res, post, lang);
}
