import { Atom } from "$lib/services/atom";
import { blogStore } from "$lib/stores/blog";
import { TranslationsStore } from "$lib/stores/lang.js";

// Generates the feed.xml file for the blog in the specified language
export function GET({ params }) {
	const { lang } = params;
	const posts = blogStore.getByLang(lang);
	const translations = new TranslationsStore(lang).current;
	const { xml } = new Atom(
		translations.siteName,
		translations.siteDescription,
		posts,
		import.meta.env.VITE_BASE_URL,
		'',
		translations.author
	)
	return new Response(
		xml,
		{
			headers: {
				'Cache-Control': 'max-age=0, s-max-age=3600',
				'Content-Type': 'application/xml'
			}
		}
	);
}

