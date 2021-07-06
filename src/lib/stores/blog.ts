
import type { Category, Post, PostProps } from "$lib/models/interfaces";
import fs from "fs";
import path from "path";
import { PostImpl } from "$lib/models/mappers";
import { Adoc } from "$lib/services/adoc";
import { toCapitalize, toSlug } from "$lib/services/slug";

class BlogStore {

    private readonly _langs: Set<string>;
    private readonly _posts: Map<string, Map<string, Post>>;
    private readonly _categories: Map<string, Category>;
    private readonly _slugsByCategory: Map<string, Set<string>>;
    private readonly _baseDir: string;
    private readonly _proc: Adoc;

    constructor(baseDir: string) {
        this._langs = new Set();
        this._posts = new Map();
        this._categories = new Map();
        this._slugsByCategory = new Map();
        this._baseDir = baseDir;
        this._proc = new Adoc();
        this._init();
    }

    private _init() {
        this._walk(this._baseDir);
        this._addOtherLangs();
    }

    private _walk(baseDir: string) {
        for (const f of fs.readdirSync(baseDir)) {
            const filePath = path.join(baseDir, f);
            if (this._isDir(filePath)) {
                this._walk(filePath);
            } else if (this._isPost(f)) {
                const post = new PostImpl(this._proc.load(filePath));
                this._add(post);
                this._categorize(post.props);
            }
        }
    }

    private _isDir(filePath: string): boolean {
        return fs.statSync(filePath).isDirectory();
    }

    private _isPost (fileName: string) {
        return path.extname(fileName) === ".adoc";
    }

    get langs() {
        return Array.from(this._langs);
    }

    _addOtherLangs() {
        for (const byLang of this._posts.values()) {
            const langs = this.langs;
            for (const lang of langs) {
                const p = byLang.get(lang);
                if (p) {
                    langs
                        .filter(l => l !== p.props.lang)
                        .forEach(l => p.props.otherLangs.push(l));
                }
            }
        }
    }

    getIndex(lang: string): PostProps[] {
        return this.getByLang(lang).map(post => post.props).sort((a, b) => b.created - a.created);
    }

    _add(post: Post): PostProps {
        const { slug, lang } = post.props;
        this._langs.add(lang);
        let translatedPosts = this._posts.get(slug);
        if (!translatedPosts) {
            translatedPosts = new Map();
        }
        this._posts.set(slug, translatedPosts.set(lang, post));
        return post.props;
    }

    _categorize(meta: PostProps) {
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

    get posts() {
        return this._posts;
    }

    get categories() {
        return this._categories;
    }

    getByCategory(categorySlug: string, lang: string): PostProps[] {
        const slugs = this._slugsByCategory.get(categorySlug);
        if (slugs) {
            return [...[...slugs].map(s => this.get(s, lang).props)];
        }
        console.warn("Not found by category: ", categorySlug);
        return [];
    }

    get(slug: string, lang: string): Post {
        const byLang = this._posts.get(slug);
        if (!byLang) {
            throw new Error(`Post not found: ${slug}`);
        }
        const post = byLang.get(lang);
        if (!post) {
            console.warn(`Post not found in ${lang}`);
            return byLang.values().next().value;
        }
        return post;
    }

    getByLang(lang: string): Post[] {
        return Array.from(
            this.posts, (([_, byLang]) => byLang.get(lang) || byLang.values().next().value));
    }
}

export const blogStore = new BlogStore(import.meta.env.VITE_POSTS_PATH);
