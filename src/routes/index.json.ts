// import { getSiteName, getDescription } from "../services/lang";
import { store } from "$lib/store";

const name = "bla bla"; // TODO getSiteName();
const description = "carlos says bla bla";// TODO getDescription();

export async function get() {
	return {
		body: {
			index: store.index,
			name,
			description,
			langs: store.langs
		}
	};
}