import { CATEGORIES_BASE_PATH } from "$lib/conf";


export function categoryPath(slug: string): string{
    return `/${CATEGORIES_BASE_PATH}/${slug}`;
}
