
import { store } from '../../store';
import { Rss } from '../../services/rss';
import { getDescription, getSiteName } from '../../services/lang';
import { BASE_URL } from '../../conf';

export function get(req, res) {
  const { lang } = req.params;
  res.writeHead(200, {
    'Cache-Control': 'max-age=0, s-max-age=3600', // 1h
    'Content-Type': 'application/rss+xml'
  });
  const rss = new Rss(getSiteName(lang), getDescription(lang), store.getByLang(lang).map(c => c.entry), BASE_URL);
  res.end(rss.xml);
}
