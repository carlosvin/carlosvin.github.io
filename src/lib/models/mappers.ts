import type { Post, PostProps } from './interfaces';
import type { Asciidoctor } from 'asciidoctor';
import { toSlug } from '$lib/services/slug';
import { postPath } from '$lib/services/url';

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

	constructor(doc: Asciidoctor.Document, filepath: string) {
		const {
			slug,
			created,
			date,
			modified,
			docdate,
			docdir,
			description,
			summary,
			keywords,
			lang,
			previewimage,
			author
		} = doc.getAttributes();
		this.filepath = filepath;
		this.dirpath = docdir;
		const finalSlug = slug || toSlug(this.filepath.split('.')[0]);
		this.title = doc.getTitle();
		this.created = Date.parse(created || date || docdate);
		this.modified = Date.parse(modified || date || docdate);
		this.keywords = keywords ? keywords.split(',').map((k: string) => k.trim()) : [];
		this.lang = lang;
		this.otherLangs = [];
		this.slug = finalSlug;
		this.summary = description || summary;
		this.author = author || DEFAULT_AUTHOR;
		this.previewimage = previewimage;
		this.path = postPath(finalSlug, lang);
		this.validate();
	}

	validate(): void {
		if (!this.slug) {
			throw TypeError(`"slug" should not be empty`);
		}
		if (!this.lang) {
			throw TypeError(`"lang" should not be empty: ${this.slug}`);
		}
	}

	get serializable(): PostProps {
		return JSON.parse(JSON.stringify(this));
	}
}

export class PostImpl implements Post {
	private readonly doc: Asciidoctor.Document;
	readonly props: PostProps;
	public readonly html: string;

	constructor(doc: Asciidoctor.Document, filepath: string) {
		this.doc = doc;
		this.html = this.doc.convert();
		this.props = new PostPropsImpl(doc, filepath);
	}
}
