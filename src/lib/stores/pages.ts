
import type { Category, IndexEntry, Post } from "$lib/models/interfaces";
import fs from "fs";
import path from "path";
import { toPost } from "$lib/models/mappers";
import { Adoc } from "$lib/services/adoc";

export class PagesStore {

    private readonly _langs: Set<string>;
    private readonly _pages: Map<string, Map<string, Post>>;
    private readonly _baseDir: string;

    constructor(baseDir: string) {
        this._langs = new Set();
        this._pages = new Map();
        this._baseDir = baseDir;
        this._init();
    }

    private _init(){
        const processor = new Adoc();
        fs.readdirSync(this._baseDir)
        .filter(fileName => path.extname(fileName) === ".adoc")
        .map(fileName => path.join(this._baseDir, fileName))
        .map(filePath => toPost(processor.load(filePath)))
        .forEach(page => this._add(page));
    }

    get langs() {
        return Array.from(this._langs);
    }

    getIndex(lang: string): IndexEntry[] {
        return this.getByLang(lang).map(c => c.entry)
            .sort((a, b) => b.modified - a.modified);
    }

    _add(post: Post): Post {
        const { slug, lang } = post.entry;
        this._langs.add(lang);
        let translatedPosts = this._pages.get(slug);
        if (!translatedPosts) {
            translatedPosts = new Map();
        }
        this._pages.set(slug, translatedPosts.set(lang, post));
        return post;
    }

    get pages() {
        return this._pages;
    }
    
    get(slug: string, lang?: string): Post {
        const byLang = this._pages.get(slug);
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
            return byLang.values().next().value;
        }
    }

    getByLang(lang: string): Post[] {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return Array.from(this.pages, (([_, byLang]) => byLang.get(lang) || byLang.values().next().value));
    }
}
