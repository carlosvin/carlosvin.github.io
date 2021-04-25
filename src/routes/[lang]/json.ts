// import { getSiteName, getDescription } from "../services/lang";
import { blogStore } from "$lib/stores/blog";

const name = "bla bla"; // TODO getSiteName();
const description = "carlos says bla bla";// TODO getDescription();


export async function get({params}) {
	const {lang} = params;
	return {
		body: {
			index: blogStore.getIndex(lang),
			name,
			description,
			langs: blogStore.langs
		}
	};
}