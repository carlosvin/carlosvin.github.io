import type { IndexEntry, Post } from "./interfaces";
import type { Asciidoctor } from 'asciidoctor';
import { toSlug } from "$lib/services/slug";

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
        docdate,
        docname,
        docfile,
        docdir,
        description,
        keywords,
        lang,
        previewimage,
    } = doc.getAttributes();

    return {
        title: doc.getTitle(),
        created: created || docdate,
        modified: docdate,
        filepath: docfile,
        dirpath: docdir,
        keywords: keywords ? keywords.split(',').map(k => k.trim()) : [],
        lang: lang,
        otherLangs: [],
        slug: slug || toSlug(docname),
        summary: description,
        author: doc.getAuthor(),
        previewimage: previewimage,
    };
}
