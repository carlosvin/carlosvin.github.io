import { store } from '../../store';
import { Rss } from '../../services/rss';
import { getDescription, getSiteName} from '../../services/lang';
import { BASE_URL } from '../../conf';

export function generateRss(req, res) {
  let lang = req.headers['accept-language'];
  lang = lang ? lang.slice(0, 2) : 'en';
  res.writeHead(200, {
    'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
    'Content-Type': 'application/rss+xml'
  });
  const rss = new Rss(getSiteName(lang), getDescription(lang), store.index, BASE_URL);
  res.end(rss.xml);
}
