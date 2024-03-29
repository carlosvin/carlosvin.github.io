import type { Category, PostProps } from '$lib/models/interfaces';
import { categoryPath } from './url';

export function jsonLdScript(str: string): string {
	return `<script type="application/ld+json">${str}</script>`;
}

export function jsonLdCategories(
	categories: Category[],
	title: string,
	description: string,
	path: string,
	lang: string
): string {
	return JSON.stringify({
		'@context': 'https://www.schema.org',
		type: 'Itemlist',
		name: title,
		description: description,
		url: path,
		itemlistElement: categories.map((c) => jsonLdCategory(c, lang))
	});
}

function jsonLdCategory(category: Category, lang: string) {
	return {
		'@type': 'ListItem',
		name: category.name,
		url: categoryPath(category.slug, lang)
	};
}

export function jsonLdPost({
	title,
	summary,
	previewimage,
	created,
	modified,
	keywords,
	author
}: PostProps): string {
	// "wordcount": "1120", articleBody
	const person = author ? jsonLdPerson(author) : undefined;
	return JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Article',
		mainEntityOfPage: {
			'@type': 'Webpage',
			'@id': 'https://google.com/article'
		},
		headline: title,
		alternativeHeadline: summary,
		description: summary,
		image: previewimage,
		datePublished: new Date(created).toISOString(),
		dateModified: new Date(modified).toISOString(),
		keywords: keywords,
		author: person,
		publisher: person
	});
}

function jsonLdPerson(name: string): { '@type': string; name: string } {
	return { '@type': 'Person', name };
}

export function jsonLdPage(name: string, description: string): string {
	return JSON.stringify({
		'@context': 'http://schema.org',
		'@type': 'WebPage',
		name: name,
		description: description,
		publisher: {
			'@type': 'ProfilePage',
			name: name
		}
	});
}
