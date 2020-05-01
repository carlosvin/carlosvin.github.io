import allAdoc from '../posts/**/*.adoc';
import { toSlug, toCapitalize } from './services/slug';
import { getLangSimplified } from './services/lang';

const requiredFields = ['date', 'title', 'slug', 'lang'];

class BlogStore {

    constructor() {
        this._posts = new Map();
        this._langs = new Map();
        this._categories = new Map();
        this._postsByCategory = new Map();
        this._lang = getLangSimplified();
        allAdoc.forEach(post => this._add(post)); // adds post to this._posts
        for (const byLang of this._posts.values()) {
            const langs = Object.keys(byLang);
            for (const lang in byLang) {
                byLang[lang].otherLangs = langs.filter(l => l !== byLang[lang].lang);
            }
        }
        this._generateIndex();
    }

    _generateIndex() {
        this._index = [];
        for (const byLang of this._posts.values()) {
            let post = byLang[this._lang];
            const langs = Object.keys(byLang);
            if (!post) {
                // TODO maybe it should try to get default site lang instead of first available
                post = byLang[langs[0]];
            }
            const entry = BlogStore._toIndexEntry(post);
            this._index.push(entry);
            this._categorize(entry);
        }
        this._index.sort((a, b) => b.date && b.date.localeCompare(a.date));
    }

    _addLang(lang, date) {
        let savedDate = this._langs.get(lang);
        if (!savedDate || savedDate < date) {
            this._langs.set(lang, date);
        }
    }

    getByLang(inputLang) {
        // TODO we could improve the performance here by storing posts by lang in a different map
        return [...this.posts.values()]
            .map(byLang => byLang[inputLang])
            .filter(c => c !== undefined);
    }

    _add(post) {
        const postModel = BlogStore._toModel(post);
        const { slug, lang, date } = postModel;
        this._addLang(lang, date);
        let translatedPosts = this._posts.get(slug);
        if (translatedPosts) {
            translatedPosts = { ...translatedPosts, [lang]: postModel };
        } else {
            translatedPosts = { [lang]: postModel };
        }
        this._posts.set(slug, translatedPosts);
        return postModel;
    }

    _categorize(postModel) {
        if (postModel.keywords) {
            postModel.keywords
                .map(k => [toSlug(k), toCapitalize(k)])
                .forEach(([slug, name]) => {
                    let posts = this._postsByCategory.get(slug);
                    if (posts === undefined) {
                        posts = [postModel];
                        this._postsByCategory.set(slug, posts);
                    } else {
                        posts.push(postModel);
                    }
                    this._categories.set(slug, name);
                });
        }
    }

    static _toModel({ metadata, html, filename }) {
        const {slug, title, doctitle, lang, summary, description, keywords} = metadata;
        const post = {
            ...metadata,
            title: title || doctitle,
            lang,
            summary: summary || description,
            html,
            slug: slug || toSlug(filename.split('.')[0]),
            keywords: keywords ? keywords.split(',').map(k => k.trim()) : undefined,
        };
        BlogStore.validate(post);
        return post;
    }

    static validate(post) {
        requiredFields.forEach(f => BlogStore._validate(post, f));
    }

    static _validate(post, field) {
        if (!post[field]) {
            throw `[${post.slug}-${post.lang}] Invalid post data: [${field}] field required`;
        }
    }

    static _toIndexEntry({ title, summary, slug, lang, date, modified, updated, keywords, otherLangs }) {
        return {
            title,
            summary,
            slug,
            lang,
            otherLangs,
            keywords,
            date: updated || modified || date,
        };
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
        const posts = this._postsByCategory.get(categorySlug);
        return posts ? posts : [];
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
