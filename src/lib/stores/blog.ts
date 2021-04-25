
import type { Category, IndexEntry, Post } from "$lib/models/interfaces";
import fs from "fs";
import path from "path";
import { toPost } from "$lib/models/mappers";
import { Adoc } from "$lib/services/adoc";

export class BlogStore {

    private readonly _langs: Set<string>;
    private readonly _posts: Map<string, Map<string, Post>>;
    private readonly _categories: Map<string, Category>;
    private readonly _slugsByCategory: Map<string, Set<string>>;
    private readonly _baseDir: string;

    constructor(baseDir: string) {
        this._langs = new Set();
        this._posts = new Map();
        this._categories = new Map();
        this._slugsByCategory = new Map();
        this._baseDir = baseDir;
        this._init();
    }

    private _init() {
        fs.readdirSync(this._baseDir)
            .filter(fileName => path.extname(fileName) === ".adoc")
            .map(fileName => path.join(this._baseDir, fileName))
            .map(filePath => toPost(new Adoc().load(filePath)))
            .forEach(post => {
                this._add(post);
                this._categorize(post.entry);
            });
        this._addOtherLangs();
    }

    get langs() {
        return Array.from(this._langs);
    }

    _addOtherLangs() {
        for (const byLang of this._posts.values()) {
            const langs = [...byLang.keys()];
            for (const lang of langs) {
                const p = byLang.get(lang);
                if (p) {
                    langs
                        .filter(l => l !== p.entry.lang)
                        .forEach(l => p.entry.otherLangs.push(l));
                }
            }
        }
    }

    getIndex(lang: string): IndexEntry[] {
        return this.getByLang(lang)
            .map(c => c.entry)
            .sort((a, b) => b.created - a.created);
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
                //            .map(k => [toSlug(k), toCapitalize(k)])
                .map(k => [k, k])
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
            return byLang.values().next().value;
        }
    }

    getByLang(lang: string): Post[] {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return Array.from(
            this.posts, (([_, byLang]) => byLang.get(lang) || byLang.values().next().value));
    }
}
