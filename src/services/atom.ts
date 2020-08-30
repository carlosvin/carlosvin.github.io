
import type { IndexEntry, Post } from './interfaces';
import {url} from './url'

class AtomItem {
    private readonly entry: IndexEntry;
    private readonly html: string;
    private readonly baseUrl: string;

    constructor(post: Post, baseUrl: string) {
        this.entry = post.entry;
        this.html = post.html;
        this.baseUrl = baseUrl;
    }

    get categories() {
        const {keywords} = this.entry;
        if (keywords) {
            return [...keywords].map(
                c => `<category term="${c}"/>`).join(`\n    `);
        }
        return '';
    }

    get title (): string {
        return this.entry.title;
    }

    get url(): string {
        return url(this.entry.slug, this.entry.lang);
    }

    get summary(): string {
        return this.entry.summary;
    }

    get modified(): string {
        return new Date(this.entry.modified).toISOString();
    }

    get otherLangsLinks() {
        const {otherLangs, slug} = this.entry;
        return otherLangs ? otherLangs.map(l => `<link 
				rel="alternate"
				hreflang="${l}"
				href="${url(slug, l )}"/>`).join("\r\n") : '';
    }

    get xml(){
        return `<entry>
            <title>${this.title}</title>
            <link href="${this.url}" />
            ${this.otherLangsLinks}   
            <id>${this.url}</id>
            <updated>${this.modified}</updated>
            <summary>${this.summary}</summary>
            <content type="html"><![CDATA[${this.html}]]></content>
            ${this.categories}
        </entry>`;
    }
}

export class Atom {
    private readonly posts: Post[];
    private readonly title: string;
    private readonly description: string;
    private readonly baseUrl: string;
    private readonly url: string;
    
    constructor(title: string, description: string, posts: Post[], baseUrl: string, path: string) {
        this.posts = posts;
        this.url = baseUrl + path;
        this.baseUrl = baseUrl;
        this.title = title;
        this.description = description;
    }
    
    get xml (): string {
        return `<?xml version="1.0" encoding="UTF-8" ?>
        <feed xmlns="http://www.w3.org/2005/Atom">
            <title>${this.title}</title>
            <subtitle>${this.description}</subtitle>
            <link rel="self" href="${this.url}" />
            <link href="${this.baseUrl}" />
            <id>${this.baseUrl}/</id>
            <updated>${new Date().toISOString()}</updated>
            ${this.posts.map(post => new AtomItem(post, this.baseUrl).xml).join('\n  ')}
        </feed>`;
    }
}
