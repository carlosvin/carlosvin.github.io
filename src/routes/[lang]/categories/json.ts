// import { getSiteName, getDescription } from "../services/lang";
import type { Category, IndexResponse } from "$lib/models/interfaces";
import { blogStore } from "$lib/stores/blog";

const title = "bla bla"; // TODO getSiteName();
const description = "carlos says bla bla";// TODO getDescription();
const categories = [...blogStore.categories.values()];

	
export async function get({params}): Promise<{body: IndexResponse<Category>}> {
	// TODO const {lang} = params;
	return {
		body: {
			index: categories,
			title,
			description,
			langs: blogStore.langs
		}
	};
}