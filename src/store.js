import allAdoc from '../posts/**/*.adoc';
import { toSlug, toCapitalize } from './services/slug';
import { getLangSimplified } from './services/lang';
import {Post, Category} from './services/models';

class BlogStore {

    constructor() {
        this._posts = new Map();
        this._langs = new Map();
        this._categories = new Map();
        this._slugsByCategory = new Map();
        this._lang = getLangSimplified();
        for (const p of allAdoc) {
            const post = new Post(p);
            this._add(post);
            this._categorize(post.entry);
            this._addLang(post.entry);
        }
        this._addOtherLangs();
        this._generateIndex();
    }

    _addOtherLangs() {
        for (const byLang of this._posts.values()) {
            const langs = Object.keys(byLang);
            for (const lang in byLang) {
                const {entry} = byLang[lang];
                entry.otherLangs = langs.filter(l => l !== entry.lang);
            }
        }
    }

    _generateIndex() {
        this._index = [...this.posts.values()]
            .map(byLang => byLang[this._lang] || Object.values(byLang)[0])
            .map(c => c.entry)
            .sort((a, b) => b.date && b.date.localeCompare(a.date));
    }

    _addLang(post) {
        const {lang, date} = post;
        let savedDate = this._langs.get(lang);
        if (!savedDate || savedDate < date) {
            this._langs.set(lang, date);
        }
        return post;
    }

    _add(post) {
        const { slug, lang } = post.entry;
        let translatedPosts = this._posts.get(slug);
        if (translatedPosts) {
            translatedPosts = { ...translatedPosts, [lang]: post };
        } else {
            translatedPosts = { [lang]: post };
        }
        this._posts.set(slug, translatedPosts);
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
                    this._categories.set(slug, new Category({slug, name}));
                });
        }
    }

    get langEntries() {
        return [...this._langs.entries()];
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
}

export const store = new BlogStore();
