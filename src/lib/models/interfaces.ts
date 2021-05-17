
export interface PostProps {
    readonly title: string;
    readonly lang: string;
    readonly summary: string;
    readonly slug: string;
    readonly keywords: string[];
    readonly filepath: string;
    readonly dirpath: string,
    readonly created: number;
    readonly modified: number;
    readonly otherLangs: string[];
    readonly author?: string;
    readonly previewimage?: string;
    readonly path: string;
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

export interface InputMetadata {
    readonly title: string;
    readonly doctitle?: string;
    readonly summary: string;
    readonly description: string;
    readonly slug?: string;
    readonly keywords?: string;
    readonly lang: string;
    readonly date: string;
    readonly updated: string;
    readonly modified: string;
    readonly previewimage?: string;
    readonly previewImage?: string;
    readonly author: string;
    readonly otherLangs: string;
}
