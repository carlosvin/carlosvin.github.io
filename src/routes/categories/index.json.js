import {store} from '../../store';
import {reply} from '../../services/http';

const categories = [...store.categories.values()];

export function get(req, res) {
	reply(res, categories);
}
