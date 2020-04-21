import { generateRss } from './_index';

export function get(req, res) {
  generateRss(req, res);
}