
import type { Category, IndexEntry, Post } from "$lib/models/interfaces";
import fs from "fs";
import path from "path";
import Processor from 'asciidoctor';
import { toPost } from "./models/mappers";

export class BlogStore {

    private readonly _langs: Set<string>;
    private readonly _posts: Map<string, Map<string, Post>>;
    private readonly _categories: Map<string, Category>;
    private readonly _slugsByCategory: Map<string, Set<string>>;
    private readonly _processor = Processor();

    constructor(baseDir: string) {
        this._langs = new Set();
        this._posts = new Map();
        this._categories = new Map();
        this._slugsByCategory = new Map();
        fs.readdirSync(baseDir)
            .filter(fileName => path.extname(fileName) === ".adoc")
            .forEach(fileName => {
                const filePath = path.join(baseDir, fileName);
                const doc = this._processor.loadFile(filePath, 
                    {
                      mkdirs: true,
                      base_dir: path.dirname(filePath),
                      safe: 'unsafe',
                      catalog_assets: true,
                      'attributes': {
                        'source-highlighter': 'highlightjs-ext',
                      }
                    });
              
            const post = toPost(doc);
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
        return this.getByLang(lang).map(c => c.entry)
            .sort((a, b) => b.modified - a.modified);
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
        return Array.from(this.posts, (([_, byLang]) => byLang.get(lang) || byLang.values().next().value));
    }
}
