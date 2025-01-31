import type { Category, Post, PostProps } from '$lib/models/interfaces';
import { PostImpl } from '$lib/models/mappers';
import { Adoc } from '$lib/services/adoc';
import { toCapitalize, toSlug } from '$lib/services/slug';

class BlogStore {
	private readonly _langs: Set<string>;
	private readonly _posts: Map<string, Map<string, Post>>;
	private readonly _categories: Map<string, Category>;
	private readonly _slugsByCategory: Map<string, Set<string>>;
	private readonly _proc: Adoc;

	constructor() {
		this._langs = new Set();
		this._posts = new Map();
		this._categories = new Map();
		this._slugsByCategory = new Map();
		this._proc = new Adoc();
		this._init();
	}

	private _init() {
		this._walk();
		this._addOtherLangs();
	}

	private _walk() {
		const loaded = import.meta.glob<string>('/static/posts/**/*.adoc', {
			eager: true,
			query: '?raw',
			import: 'default'
		});
		for (const [filePath, content] of Object.entries(loaded)) {
			const post = new PostImpl(this._proc.load(filePath, content), filePath);
			this._add(post);
			this._categorize(post.props);
		}
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
					langs.filter((l) => l !== p.props.lang).forEach((l) => p.props.otherLangs.push(l));
				}
			}
		}
	}

	getIndex(lang: string): PostProps[] {
		return this.getByLang(lang)
			.map((post) => post.props)
			.sort((a, b) => b.created - a.created);
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
				.map((k) => [toSlug(k), toCapitalize(k)])
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
			return [...[...slugs].map((s) => this.get(s, lang).props)];
		}
		console.warn('Not found by category: ', categorySlug);
		return [];
	}

	get(slug: string, lang: string): Post {
		const byLang = this._posts.get(slug);
		if (!byLang) {
			throw new Error(`Post not found: ${slug}`);
		}
		const post = byLang.get(lang);
		if (!post) {
			const [defaultPost] = byLang.values();
			console.warn(
				`Post ${slug} not found in ${lang}, returning post in ${defaultPost.props.lang}`
			);
			return defaultPost;
		}
		return post;
	}

	getByLang(lang: string): Post[] {
		return Array.from(
			this.posts.values(),
			(byLang) => byLang.get(lang) ?? byLang.values().next().value
		).filter((post): post is Post => post !== undefined);
	}

	/**
	 * @returns The list of entries for the SvelteKit entry generator
	 * https://kit.svelte.dev/docs/page-options#entries
	 * */
	get entries() {
		const postEntries: { slug: string; lang: string }[] = [];
		this._posts.keys().forEach((slug) => postEntries.push({ slug, lang: 'en' }));
		this._posts.keys().forEach((slug) => postEntries.push({ slug, lang: 'es' }));
		return postEntries;
	}
}

export const blogStore = new BlogStore();
