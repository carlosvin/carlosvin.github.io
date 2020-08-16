import allAdoc from '../posts/**/*.adoc';
import { toSlug, toCapitalize } from './services/slug';
import { getLangSimplified } from './services/lang';
//import { Post, Category, InputMetadata, IndexEntry } from './services/interfaces';
import { AUTHOR } from './conf';
import { path, url } from './services/url';
import type { Category, IndexEntry, InputMetadata, Post } from './services/interfaces';


class BlogStore {

    private readonly _langs: Set<string>;
    private readonly _posts: Map<string, Map<string, Post> >;
    private readonly _categories: Map<string, Category>;
    private readonly _slugsByCategory: Map<string, Set<string>>;
    private readonly _index: IndexEntry[];
    public readonly lang;

    constructor() {
        this._langs = new Set();
        this._posts = new Map();
        this._categories = new Map();
        this._slugsByCategory = new Map();
        this.lang = getLangSimplified();
        for (const p of allAdoc) {
            const post = BlogStore.newPost(p.metadata, p.html, p.filename);
            this._add(post);
            this._categorize(post.entry);
        }
        this._addOtherLangs();
        this._index = this._generateIndex();
    }

    private static newPost (metadata: InputMetadata, html: string, filename: string): Post {
        return {
            entry: this.newEntry(metadata, filename),
            html,
        };
    }

    private static newEntry ({title, doctitle, author,date,description,keywords,lang,modified,otherLangs,previewimage,slug,summary,updated}: Partial<InputMetadata>, filename: string): IndexEntry {
        const pSlug = slug || toSlug(filename.split('.')[0]);
        const pModified = updated || modified || date;
        const pDate = date || updated || modified;
        return {
            title: title || doctitle || '',
            lang, 
            summary: summary || description,
            slug: pSlug,
            keywords: keywords ? keywords.split(',').map(k => k.trim()): [],
            filename,
            modified: new Date(pModified),
            created: new Date(pDate),
            author: author || AUTHOR,
            previewimage: previewimage || 'icons/icon-192x192.png',
            otherLangs: [],
            path: path(pSlug, lang),
            url: url(pSlug, lang)
        };
    }

    get langs () {
        return Array.from(this._langs);
    }

    _addOtherLangs() {
        for (const byLang of this._posts.values()) {
            const langs = Object.keys(byLang);
            for (const lang in byLang) {
                const { entry } = byLang[lang];
                langs.filter(l => l !== entry.lang).forEach(l => entry.otherLangs.add(l));
            }
        }
    }

    _generateIndex(): IndexEntry[] {
        return this.getByLang(this.lang).map(c => c.entry)
            .sort((a, b) => b.modified.getTime() - a.modified.getTime());
    }

    _add(post) {
        const { slug, lang } = post.entry;
        this._langs.add(lang);
        let translatedPosts = this._posts.get(slug);
        if (!translatedPosts) {
            translatedPosts = new Map();
        }
        this._posts.set(slug, translatedPosts.set(lang, post));
        return post;
    }

    _categorize(meta) {
        if (meta.keywords) {
            meta.keywords
                .map(k => [toSlug(k), toCapitalize(k)])
                .forEach(([slug, name]) => {
                    let posts = this._slugsByCategory.get(slug);
                    if (posts === undefined) {
                        posts = new Set();
                        this._slugsByCategory.set(slug, posts);
                    }
                    posts.add(meta.slug);
                    this._categories.set(slug, { slug, name });
                });
        }
    }

    get index() {
        return this._index;
    }

    get posts() {
        return this._posts;
    }

    get categories() {
        return this._categories;
    }

    getByCategory(categorySlug) {
        const slugs = this._slugsByCategory.get(categorySlug);
        return [...[...slugs]
            .map(s => this.get(s))
            .map(s => s.entry)];
    }

    get(slug, lang = undefined) {
        const byLang = this._posts.get(slug);
        if (lang) {
            return byLang[lang];
        } else {
            return Object.values(byLang)[0];
        }
    }

    getByLang(lang): Post[] {
        return [...this.posts.values()].map(byLang => byLang[lang] || Object.values(byLang)[0]);
    }
}

export const store = new BlogStore();
