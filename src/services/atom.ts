
import type { IndexEntry, Post } from './interfaces';
import { url } from './url'

class AtomItem {
    private readonly entry: IndexEntry;
    private readonly html: string;
    private readonly auth: string;

    constructor(post: Post, auth: string) {
        this.entry = post.entry;
        this.html = post.html;
        this.auth = auth;
    }

    get categories() {
        const { keywords } = this.entry;
        if (keywords) {
            return [...keywords].map(
                c => `<category term="${c}"/>`).join(`\n    `);
        }
        return '';
    }

    get title(): string {
        return this.entry.title;
    }

    get url(): string {
        return url(this.entry.slug, this.entry.lang);
    }

    get summary(): string {
        return this.entry.summary;
    }

    get modified(): string {
        try {
            return new Date(this.entry.modified||this.entry.created).toISOString();
        } catch (e) {
            console.error("Error generating rss", this.entry);
            return '?';
        }
    }

    get otherLangsLinks() {
        const { otherLangs, slug } = this.entry;
        return otherLangs ? otherLangs.map(l => `<link 
				rel="alternate"
				hreflang="${l}"
				href="${url(slug, l)}"/>`).join("\r\n") : '';
    }

    get xml() {
        return `<entry>
            <title>${this.title}</title>
            <link href="${this.url}" />
            ${this.otherLangsLinks}   
            <id>${this.url}</id>
            <updated>${this.modified}</updated>
            <summary>${this.summary}</summary>
            <content type="html"><![CDATA[${this.html}]]></content>
            ${this.categories}
            <author><name>${this.auth}</name></author>
        </entry>`;
    }
}

export class Atom {
    private readonly posts: Post[];
    private readonly title: string;
    private readonly description: string;
    private readonly baseUrl: string;
    private readonly url: string;
    private readonly auth: string;

    constructor(title: string, description: string, posts: Post[], baseUrl: string, path: string, auth: string) {
        this.posts = posts;
        this.url = baseUrl + path;
        this.baseUrl = baseUrl;
        this.title = title;
        this.description = description;
        this.auth = auth;
    }

    get xml(): string {
        const latest = Math.max(...this.posts
            .filter(({entry}) => entry.modified && !isNaN(entry.modified))
            .map( p => p.entry.modified));
        return `<?xml version="1.0" encoding="UTF-8" ?>
        <feed xmlns="http://www.w3.org/2005/Atom">
            <title>${this.title}</title>
            <subtitle>${this.description}</subtitle>
            <link rel="self" href="${this.url}" />
            <link href="${this.baseUrl}" />
            <id>${this.baseUrl}/</id>
            <updated>${new Date(latest).toISOString()}</updated>
            ${this.posts.map(post => new AtomItem(post, this.auth).xml).join('\n  ')}
        </feed>`;
    }
}
