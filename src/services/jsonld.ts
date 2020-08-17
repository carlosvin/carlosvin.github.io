import { jsonLdScript } from "./html";
import type { Category, IndexEntry } from "./interfaces";
import { categoryPath } from "./url";

export function jsonLdScript(str: string): string {
    return `<script type="application/ld+json">${str}</script>`;
}

export function jsonLdCategories(categories: Category[], title: string, description: string, path: string): string {
    return jsonLdScript(
        JSON.stringify({
            "@context": "https://www.schema.org",
            type: "Itemlist",
            name: title,
            description: description,
            url: path,
            itemlistElement: categories.map((c) => jsonLdCategory(c)),
        })
    );
}

export function jsonLdCategory(category: Category): string {
    return JSON.stringify({
        "@type": "ListItem",
        "name": category.name,
        "url": categoryPath(category.slug)
    });
}

export function jsonLdPost({title, summary, previewimage, created,modified, keywords, author}: IndexEntry): string {
    // "wordcount": "1120", articleBody
    return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "mainEntityOfPage": {
            "@type": "Webpage",
            "@id": "https://google.com/article"
        },
        "headline": title,
        "alternativeHeadline": summary,
        "description": summary,
        "image": previewimage,
        "datePublished": created,
        "dateModified": modified,
        "keywords": keywords,
        "author": {
            "@type": "Person",
            "name": author
        },
        "publisher": author
    });
}

export function jsonLdPage (name: string, description: string): string {
    return JSON.stringify(
        {
            "@context": "http://schema.org",
            "@type": "WebPage",
            "name": name,
            "description": description,
            "publisher": {
                "@type": "ProfilePage",
                "name": name
            }
    });
}
