import { url as gUrl, path as gPath } from './url';
import { toSlug } from './slug';

const requiredFields = ['date', 'title', 'slug', 'lang'];


export class IndexEntry {
    constructor(metadata, filename) {
        const {
			title, doctitle, 
			summary, description, 
			slug, keywords, lang,
			date, updated, modified} = metadata;
        
		this.title = title || doctitle;
		this.lang = lang;
        this.description = summary || description;
        this.slug = slug || toSlug(filename.split('.')[0]),
        this.keywords = keywords ? keywords.split(',').map(k => k.trim()) : undefined;
        this.filename = filename;
        this.date = date || updated || modified;
        this.validate();

        this.validate();
    }

    get path() {
        return gPath(this.slug, this.lang);
    }

    get url() {
        return gUrl(this.slug, this.lang);
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