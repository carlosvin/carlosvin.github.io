import {store} from '../../store';
import {reply} from '../../services/http';
import type { ServerResponse } from 'http';

const categories = [...store.categories.values()];

export function get(req: unknown, res: ServerResponse): void {
	reply(res, categories);
}
