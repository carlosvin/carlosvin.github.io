// import { getSiteName, getDescription } from "../services/lang";
import { BlogStore } from "$lib/store";

const name = "bla bla"; // TODO getSiteName();
const description = "carlos says bla bla";// TODO getDescription();

const store = new BlogStore("/home/carlos/workspace/carlosvin.github.io/static/posts");

export async function get({params}) {
	const {lang} = params;
	return {
		body: {
			index: store.getIndex(lang),
			name,
			description,
			langs: store.langs
		}
	};
}