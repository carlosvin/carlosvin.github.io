// import { getSiteName, getDescription } from "../services/lang";
import type { IndexResponse, PostProps } from "$lib/models/interfaces";
import { blogStore } from "$lib/stores/blog";
import { tr } from "$lib/stores/lang";

export async function get({params}): Promise<{body: IndexResponse<PostProps>}> {
	const {lang} = params;
	const index = blogStore.getIndex(lang);
	return {
		body: {
			index: index,
			title: tr.get(lang, 'siteName'),
			description: tr.get(lang, 'siteDesc'),
			langs: blogStore.langs
		}
	};
}
