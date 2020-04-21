import { generateRss } from './_index';

// TODO it would be better to find a way to redirect with sapper
export function get(req, res) {
  generateRss(req, res);
}
