// import { getSiteName, getDescription } from "../services/lang";
import { BlogStore } from "$lib/stores/blog";
import { BASE_DIR } from "../../config";

const name = "bla bla"; // TODO getSiteName();
const description = "carlos says bla bla";// TODO getDescription();

const store = new BlogStore(BASE_DIR);

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