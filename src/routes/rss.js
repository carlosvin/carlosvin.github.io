import { store } from '../store';
import {BASE_URL, SITE_NAME, SITE_DESCRIPTION} from '../conf';

function renderXmlRssFeed (posts) {
    return `<?xml version="1.0" encoding="UTF-8" ?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
<channel>
    <title><![CDATA[${SITE_NAME}]]></title>
    <link>${BASE_URL}</link>
  <description><![CDATA[${SITE_DESCRIPTION}]]></description>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
        <url>${BASE_URL}/profile-pic-small.jpg</url>
        <title><![CDATA[David's Blog]]></title>
        <link>${BASE_URL}</link>
    </image>
    ${posts.map(post => `
        <item>
            <title>${post.title}</title>
            <link>${BASE_URL}/${post.slug}/${post.lang}</link>
            <guid isPermaLink="false">${BASE_URL}/${post.slug}/${post.lang}</guid>
            <description><![CDATA[${post.description}]]></description>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        </item>
    `).join('\n')}
</channel>
</rss>`;
}

// TODO add preview image and lang.
// TODO consider permalinks

export function get(req, res) {

  res.writeHead(200, {
    'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
    'Content-Type': 'application/rss+xml'
  });

  const feed = renderXmlRssFeed(store.index);
  res.end(feed);

}