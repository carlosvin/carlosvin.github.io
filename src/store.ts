import allAdoc from '../posts/**/*.adoc';
import { toSlug, toCapitalize } from './services/slug';
import { getLangSimplified } from './services/lang';
//import { Post, Category, InputMetadata, IndexEntry } from './services/interfaces';
import { AUTHOR } from './conf';
import { categoryPath, path, url } from './services/url';
import type { Category, IndexEntry, InputMetadata, Post } from './services/interfaces';


class BlogStore {

    private readonly _langs: Set<string>;
    private readonly _posts: Map<string, Map<string, Post>>;
    private readonly _categories: Map<string, Category>;
    private readonly _slugsByCategory: Map<string, Set<string>>;
    private readonly _index: IndexEntry[];
    public readonly lang: string;

    constructor() {
        this._langs = new Set();
        this._posts = new Map();
        this._categories = new Map();
        this._slugsByCategory = new Map();
        this.lang = getLangSimplified();
        for (const p of allAdoc) {
            const post = BlogStore.newPost(p.metadata as InputMetadata, p.html, p.filename);
            this._add(post);
            this._categorize(post.entry);
        }
        this._addOtherLangs();
        this._index = this._generateIndex();
    }

    private static newPost(metadata: InputMetadata, html: string, filename: string): Post {
        return {
            entry: BlogStore.newEntry(metadata, filename),
            html,
        };
    }

    private static newEntry({ title, doctitle, author, date, description, keywords, lang, modified, previewimage, slug, summary, updated }: InputMetadata, filename: string): IndexEntry {
        const pSlug = slug || toSlug(filename.split('.')[0]);
        const pModified = updated || modified || date;
        const pDate = date || updated || modified;
        return {
            title: title || doctitle || '',
            lang,
            summary: summary || description,
            slug: pSlug,
            keywords: keywords ? keywords.split(',').map(k => k.trim()) : [],
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

    get langs() {
        return Array.from(this._langs);
    }

    _addOtherLangs() {
        for (const byLang of this._posts.values()) {
            const langs = Object.keys(byLang);
            for (const lang in byLang) {
                const p = byLang.get(lang);
                if (p) {
                    langs
                        .filter(l => l !== p.entry.lang)
                        .forEach(l => p.entry.otherLangs.push(l));
                }
            }
        }
    }

    _generateIndex(): IndexEntry[] {
        return this.getByLang(this.lang).map(c => c.entry)
            .sort((a, b) => b.modified.getTime() - a.modified.getTime());
    }

    _add(post: Post): Post {
        const { slug, lang } = post.entry;
        this._langs.add(lang);
        let translatedPosts = this._posts.get(slug);
        if (!translatedPosts) {
            translatedPosts = new Map();
        }
        this._posts.set(slug, translatedPosts.set(lang, post));
        return post;
    }

    _categorize(meta: IndexEntry) {
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

    getByCategory(categorySlug: string): IndexEntry[] {
        const slugs = this._slugsByCategory.get(categorySlug);
        if (slugs) {
            return [...[...slugs]
                .map(s => this.get(s))
                .map(s => s.entry)];
        }
        console.warn("Not found by category: ", categorySlug);
        return [];
        
    }

    get(slug: string, lang?: string): Post {
        const byLang = this._posts.get(slug);
        if (!byLang) {
            throw new Error("Post not found: " + slug);
        }
        if (lang) {
            const post = byLang.get(lang);
            if (!post) {
                throw new Error("Post not found");
            }
            return post;
        } else {
            return Object.values(byLang)[0];
        }
    }

    getByLang(lang: string): Post[] {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return Array.from(this.posts, (([_, byLang]) => byLang.get(lang) || byLang.values().next().value));
    }
}

export const store = new BlogStore();
