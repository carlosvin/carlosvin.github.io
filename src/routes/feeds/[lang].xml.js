
import { store } from '../../store';
import { Atom } from '../../services/feeds/atom';
import { getDescription, getSiteName } from '../../services/lang';
import { BASE_URL } from '../../conf';

export function get(req, res) {
  const { lang } = req.params;
  res.writeHead(200, {
    'Cache-Control': 'max-age=0, s-max-age=3600', // 1h
    'Content-Type': `application/atom+xml`
  });
  res.end(new Atom(
    getSiteName(lang), 
    getDescription(lang), 
    store.getByLang(lang), 
    BASE_URL, 
    req.originalUrl
  ).xml);
}
