import { store } from '../../store';
import {BASE_URL, SITE_NAME, SITE_DESCRIPTION} from '../../conf';

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

function renderXmlRssFeed (posts) {
    return `<?xml version="1.0" encoding="UTF-8" ?>
<rss 
  xmlns:dc="http://purl.org/dc/elements/1.1/" 
  xmlns:content="http://purl.org/rss/1.0/modules/content/" 
  xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
<channel>
  <title><![CDATA[${SITE_NAME}]]></title>
  <link>${BASE_URL}</link>
  <description><![CDATA[${SITE_DESCRIPTION}]]></description>
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

// TODO add preview image and lang.

export function get(req, res) {

  res.writeHead(200, {
    'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
    'Content-Type': 'application/rss+xml'
  });

  const feed = renderXmlRssFeed(store.index);
  res.end(feed);

}