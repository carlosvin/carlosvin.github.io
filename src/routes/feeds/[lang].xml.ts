
import { store } from '../../store';
import { Atom } from '../../services/atom';
import { getDescription, getSiteName } from '../../services/lang';
import { AUTHOR, BASE_URL } from '../../conf';
import type { ServerResponse } from 'http';

interface Req { 
  params: { lang: string }
  originalUrl: string 
}

export function get(req: Req, res: ServerResponse): void {
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
    req.originalUrl,
    AUTHOR
  ).xml);
}
