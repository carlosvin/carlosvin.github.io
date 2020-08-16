import { jsonLdScript } from "./html";
import type { Category } from "./interfaces";
import { categoryPath } from "./url";

export function jsonLdCategories(categories: Category[], title: string, description: string, path: string) {
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

export function jsonLdCategory(category: Category) {
    return {
        "@type": "ListItem",
        "name": category.name,
        "url": categoryPath(category)  
    };
}
