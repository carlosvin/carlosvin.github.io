
import { store } from '../../store';
import { Rss } from '../../services/rss';
import { getDescription, getSiteName} from '../../services/lang';
import { BASE_URL } from '../../conf';

export function get(req, res) {
  let lang = req.headers['accept-language'];
  lang = lang ? lang.slice(0, 2) : 'en';
  res.writeHead(200, {
    'Cache-Control': `max-age=0, s-max-age=${3600}`, // 1h
    'Content-Type': 'application/rdf+xml'
  });
  const rss = new Rss(getSiteName(lang), getDescription(lang), store.index, BASE_URL);
  res.end(rss.xml);
}
