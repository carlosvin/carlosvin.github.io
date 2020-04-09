import all from '../posts/**/*.md';
import {toSlug} from './services/slug';
import {getLangSimplified} from './services/lang';

class BlogStore {

    constructor() {
        this._posts = new Map();
        all.forEach(post => this._add(post)); // adds post to this._posts
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

    _add(post) {
        const postModel = BlogStore._toModel(post);
        const {slug, lang} = postModel;    
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
            lang: metadata.lang,
            summary: metadata.summary || metadata.description,
            html,
            slug
        };
        BlogStore.validate(post);
        return post;
    }

    static validate(post) {
        if (!post.date || !post.title || !post.slug || !post.lang) {
            delete post.html;
            throw `Invalid post data: ${JSON.stringify(post)}`;
        }
    }

    static _toIndexEntry({title, summary, slug, lang, date, modified, updated}, langs){
        const otherLangs = langs.filter(l => l !== lang);
        return {
            title, 
            summary, 
            slug, 
            lang, 
            otherLangs,
            date: updated || modified || date
        };
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
