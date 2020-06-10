import { url as gUrl, path as gPath, categoryPath } from './url';
import { toSlug } from './slug';
import { AUTHOR } from '../conf';

const requiredFields = ['date', 'title', 'slug', 'lang'];

export class IndexEntry {
    constructor(metadata, filename) {
        const {
            title, doctitle,
            summary, description,
            slug, keywords, lang,
            date, updated, modified,
            previewimage, author,
            otherLangs
        } = metadata;

        this.title = title || doctitle;
        this.lang = lang;
        this.summary = summary || description;
        this.slug = slug || toSlug(filename.split('.')[0]);
        this.keywords = IndexEntry.buildKeywords(keywords);
        this.filename = filename;
        this.modified = updated || modified || date;
        this.date = date || updated || modified;
        this.author = author || AUTHOR;
        this.previewimage = previewimage || 'icons/icon-192x192.png';
        this.otherLangs = otherLangs;
        this.validate();
    }

    static buildKeywords (keywords) {
        if (typeof keywords === 'string') {
            return keywords.split(',').map(k => k.trim());
        }
        return keywords;
    }

    get path() {
        return gPath(this.slug, this.lang);
    }

    get url() {
        return gUrl(this.slug, this.lang);
    }

    // "wordcount": "1120",
    // articleBody

    get jsonLd() {
        return `{
            "@context": "https://schema.org",
            "@type": "Article",
            "mainEntityOfPage": {
              "@type": "Webpage",
              "@id": "https://google.com/article"
            },
            "headline": "${this.title}",
            "alternativeHeadline": "${this.summary}",
            "description": "${this.summary}",
            "image": "${this.previewimage}",
            "datePublished": "${this.date}",
            "dateModified": "${this.modified}",
            "keywords": "${this.keywords}",
            "author": {
              "@type": "Person",
              "name": "${this.author}"
            },
            "publisher": "${this.author}"
        }`;
    }

    get jsonLdScript () {
        return `<script type="application/ld+json">${this.jsonLd}</script>`;
    }

    validate() {
        requiredFields.forEach(f => this._validate(f));
    }

    _validate(field) {
        if (!this[field]) {
            throw `[${this.path}] Invalid post data: [${field}] field required`;
        }
    }
}

export class Post {

    constructor({ metadata, html, filename }) {
        this.entry = new IndexEntry(metadata, filename);
        this.html = html;
    }
}

export class Category {
    constructor({name, slug}) {
        this.name = name;
        this.slug = slug;
        this.path = categoryPath(slug);
        this.jsonLd = {
            "@type": "ListItem",
            "name": this.name,
            "url": this.path    
        };
    }
}
