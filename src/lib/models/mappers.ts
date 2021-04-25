import type { IndexEntry, Post } from "./interfaces";
import type { Asciidoctor } from 'asciidoctor';
import { toSlug } from "$lib/services/slug";
import { postPath } from "$lib/services/url";

export function toPost(doc: Asciidoctor.Document) : Post {
    return {
        entry: toEntry(doc),
        html: doc.convert()
    };
}

export function toEntry(doc: Asciidoctor.Document) : IndexEntry {
    const {
        slug,
        created,
        date,
        modified,
        docdate,
        docname,
        docfile,
        docdir,
        description,
        keywords,
        lang,
        previewimage,
    } = doc.getAttributes();
    const finalSlug = slug || toSlug(docname.split('.')[0]);
    return {
        title: doc.getTitle(),
        created: Date.parse(created || date || docdate),
        modified: Date.parse(modified || docdate),
        filepath: docfile,
        dirpath: docdir,
        keywords: keywords ? keywords.split(',').map(k => k.trim()) : [],
        lang: lang,
        otherLangs: [],
        slug: finalSlug,
        summary: description,
        author: doc.getAuthor(),
        previewimage: previewimage,
        path: postPath(finalSlug, lang)
    };
}
