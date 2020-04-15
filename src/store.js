import allAdoc from '../posts/**/*.adoc';
import {toSlug} from './services/slug';
import {getLangSimplified} from './services/lang';

const requiredFields = ['date', 'title', 'slug', 'lang'];

class BlogStore {
    
    constructor() {
        this._posts = new Map();
        this._langs = new Map();
        allAdoc.forEach(post => this._add(post)); // adds post to this._posts
        this._lang = getLangSimplified();
        this._index = [];
        for (const byLang of this._posts.values()) {
            let post = byLang[this._lang];
            const langs = Object.keys(byLang);
            if (!post) {
                // TODO maybe it should try to get default site lang instead of first available
                post = byLang[langs[0]];
            }
            const entry = BlogStore._toIndexEntry(post, langs);
            this._index.push(entry);
        }
        this._index.sort((a, b) => b.date && b.date.localeCompare(a.date));
    }

    _addLang (lang, date) {
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
        const {slug, lang, date} = postModel;
        this._addLang(lang, date);
        let translatedPosts = this._posts.get(slug);
        if (translatedPosts) {
            translatedPosts = {...translatedPosts, [lang]: postModel};
        } else {
            translatedPosts = {[lang]: postModel};
        }
        this._posts.set(slug, translatedPosts);
        return postModel;
    }

    static _toModel({metadata, html, filename}) {
        const slug = metadata.slug || toSlug(filename.split('.')[0]);
        const post = {
            ...metadata,
            title: metadata.title || metadata.doctitle,
            lang: metadata.lang,
            summary: metadata.summary || metadata.description,
            html,
            slug,
            keywords: metadata.keywords ? metadata.keywords.split(',').map(k => k.trim()) : undefined,
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

    static _toIndexEntry({title, summary, slug, lang, date, modified, updated, keywords}, langs){
        const otherLangs = langs.filter(l => l !== lang);
        return {
            title, 
            summary, 
            slug, 
            lang, 
            otherLangs,
            date: updated || modified || date,
            keywords
        };
    }

    get langEntries () {
        return [...this._langs.entries()];
    }

    get index() {
        return this._index;
    }

    get posts() {
        return this._posts;
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
