import type { Post, PostProps } from "./interfaces";
import type { Asciidoctor } from 'asciidoctor';
import { toSlug } from "$lib/services/slug";
import { postPath } from "$lib/services/url";

export class PostPropsImpl implements PostProps {
    
    readonly title: string;
    readonly lang: string;
    readonly summary: string;
    readonly slug: string;
    readonly keywords: string[];
    readonly filepath: string;
    readonly dirpath: string;
    readonly created: number;
    readonly modified: number;
    readonly otherLangs: string[];
    readonly author?: string;
    readonly previewimage?: string;
    readonly path: string;

    constructor(doc: Asciidoctor.Document) {
        const {
            slug,
            created,
            date,
            modified,
            docdate,
            docname,
            docfile,
            docdir,
            description,
            keywords,
            lang,
            previewimage,
        } = doc.getAttributes();
        const finalSlug = slug || toSlug(docname.split('.')[0]);
        this.title = doc.getTitle();
        this.created = Date.parse(created || date || docdate);
        this.modified = Date.parse(modified || docdate);
        this.filepath = docfile;
        this.dirpath = docdir;
        this.keywords = keywords ? keywords.split(',').map(k => k.trim()) : [];
        this.lang = lang;
        this.otherLangs = [];
        this.slug = finalSlug;
        this.summary = description;
        this.author = doc.getAuthor();
        this.previewimage = previewimage;
        this.path = postPath(finalSlug, lang);
    }
}

export class PostImpl implements Post {
    private readonly doc: Asciidoctor.Document;
    readonly props: PostProps;
    private _html?: string;

    constructor (doc: Asciidoctor.Document) {
        this.doc = doc;
        this.props = new PostPropsImpl(doc);
    }

    get html(): string {
        if (!this._html) {
            this._html = this.doc.convert();
        }
        return this._html;
    }
} 