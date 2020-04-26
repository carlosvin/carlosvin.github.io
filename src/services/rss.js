
import {url} from '../services/models';

class RssItem {
    constructor(post, baseUrl){
        this.baseUrl = baseUrl;
        this.title = post.title;
        this.summary = post.summary;
        this.pubDate = new Date(post.date).toUTCString();
        this.url = url(post.slug, post.lang);
        this.categories = this.getCategories(post);
    }

    getCategories({keywords}) {
        if (keywords) {
            return [...keywords].map(
                c => `<category>${c}</category>`).join(`\n    `);
        }
        return '';
    }

    get xml(){
        return `<item>
            <title><![CDATA[${this.title}]]></title>
            <link>${this.url}</link>
            <guid isPermaLink="false">${this.url}</guid>
            <description><![CDATA[${this.summary}]]></description>
            <pubDate>${this.pubDate}</pubDate>
            ${this.categories}
        </item>`;
    }
}

export class Rss {
    constructor(title, description, posts, baseUrl) {
        this.posts = posts;
        this.baseUrl = baseUrl;
        this.title = title;
        this.description = description;
    }
    
    get xml () {
        return `<?xml version="1.0" encoding="UTF-8" ?>
        <rss 
        xmlns:dc="http://purl.org/dc/elements/1.1/" 
        xmlns:content="http://purl.org/rss/1.0/modules/content/" 
        xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
        <channel>
        <title><![CDATA[${this.title}]]></title>
        <link>${this.baseUrl}</link>
        <description><![CDATA[${this.description}]]></description>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${this.posts.map(post => new RssItem(post, this.baseUrl).xml).join('\n  ')}
        </channel>
        </rss>`;
    }
}
