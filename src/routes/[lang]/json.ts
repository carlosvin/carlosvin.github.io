import type { IndexResponse, PostProps } from "$lib/models/interfaces";
import { blogStore } from "$lib/stores/blog";
import { I18N } from "$lib/stores/lang";

export async function get({params}): Promise<{body: IndexResponse<PostProps>}> {
	const {lang} = params;
	const index = blogStore.getIndex(lang);
	return {
		body: {
			index: index,
			title: I18N.get(lang, 'siteName'),
			description: I18N.get(lang, 'siteDescription'),
			langs: blogStore.langs
		}
	};
}
