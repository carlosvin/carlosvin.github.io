
import {url} from '../url'

class AtomItem {
    constructor(post, baseUrl){
        this.baseUrl = baseUrl;
        const {entry, html} = post;
        this.title = entry.title;
        this.summary = entry.summary;
        this.html = html;
        this.modified = new Date(entry.modified).toISOString();
        this.url = url(entry.slug, entry.lang);
        this.categories = this.getCategories(post.entry);
        this.otherLangsLinks = this.getHrefLangs(entry);
    }

    getHrefLangs({otherLangs, slug}) {
        return otherLangs ? otherLangs.map(l => `<link 
				rel="alternate"
				hreflang="${l}"
				href="${url(slug, l )}"/>`).join("\r\n") : '';
    }

    getCategories({keywords}) {
        if (keywords) {
            return [...keywords].map(
                c => `<category term="${c}"/>`).join(`\n    `);
        }
        return '';
    }

    get xml(){
        return `<item>
            <title>${this.title}</title>
            <link href="${this.url}" />
            ${this.otherLangsLinks}   
            <id>${this.url}</id>
            <updated>${this.modified}</updated>
            <summary>${this.summary}</summary>
            <content type="xhtml"><![CDATA[${this.html}]]></content>
            ${this.categories}
        </item>`;
    }
}

export class Atom {
    constructor(title, description, posts, baseUrl, path) {
        this.posts = posts;
        this.url = baseUrl + path;
        this.baseUrl = baseUrl;
        this.title = title;
        this.description = description;
    }
    
    get xml () {
        return `<?xml version="1.0" encoding="UTF-8" ?>
        <feed xmlns="http://www.w3.org/2005/Atom">
            <title>${this.title}</title>
            <subtitle>${this.description}</subtitle>
            <link rel="self" href="${this.url}" />
            <link href="${this.baseUrl}" />
            <id>${this.baseUrl}</id>
            <updated>${new Date().toISOString()}</updated>
            ${this.posts.map(post => new AtomItem(post, this.baseUrl).xml).join('\n  ')}
        </feed>`;
    }
}
