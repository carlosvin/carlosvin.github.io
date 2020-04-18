import { store } from '../../store';
import { getDescription } from '../../services/lang';
import {BASE_URL, SITE_NAME} from '../../conf';

function url({lang, slug}) {
  return `${BASE_URL}/${slug}/${lang}`;
}

function categories ({keywords}) {
  if (keywords) {
    return [...keywords].map(c => `<category>${c}</category>`).join('');
  }
  return '';
}

function renderXmlRssItem (post) {
  return `
  <item>
    <title>${post.title}</title>
    <link>${url(post)}</link>
    <guid isPermaLink="false">${url(post)}</guid>
    <description><![CDATA[${post.summary}]]></description>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    ${categories(post)}
  </item>
  `;
}

function renderXmlRssFeed (posts, lang) {
    return `<?xml version="1.0" encoding="UTF-8" ?>
<rss 
  xmlns:dc="http://purl.org/dc/elements/1.1/" 
  xmlns:content="http://purl.org/rss/1.0/modules/content/" 
  xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
<channel>
  <title><![CDATA[${SITE_NAME}]]></title>
  <link>${BASE_URL}</link>
  <description><![CDATA[${getDescription(lang)}]]></description>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <image>
      <url>${BASE_URL}/logo-192.png</url>
      <title><![CDATA[${SITE_NAME}]></title>
      <link>${BASE_URL}</link>
  </image>
    ${posts.map(post => renderXmlRssItem(post)).join('\n')}
</channel>
</rss>`;
}

export function get(req, res) {
  let lang = req.headers['accept-language'];
  lang = lang ? lang.slice(0, 2) : 'en';
  res.writeHead(200, {
    'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
    'Content-Type': 'application/rss+xml'
  });

  const feed = renderXmlRssFeed(store.index, lang);
  res.end(feed);

}