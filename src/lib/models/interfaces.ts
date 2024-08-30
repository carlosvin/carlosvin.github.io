export interface PostProps {
	readonly title: string;
	readonly lang: string;
	readonly summary: string;
	readonly slug: string;
	readonly keywords: string[];
	readonly filepath: string;
	readonly dirpath: string;
	readonly created: number;
	readonly modified: number;
	readonly otherLangs: string[];
	readonly author?: string;
	readonly previewimage?: string;
	readonly path: string;
	readonly serializable: PostProps;
	// "wordcount": "1120",
	// articleBody
}

export interface Post {
	props: PostProps;
	html: string;
}

export interface Category {
	readonly name: string;
	readonly slug: string;
	// readonly path: string;
}

export interface IndexResponse<T> {
	index: T[];
	langs: string[];
}

export interface Translations {
	[key: string]: string;
}

export interface Translator {
	get(lang: string, key: string): string;
}

export interface HeadInfo {
	readonly title: string;
	readonly description: string;
}
