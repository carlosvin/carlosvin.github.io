export function toSlug(str: string): string {
	return str
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9 -]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
}

export function toCapitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toHashtags(list: string[], sep = ' '): string {
	return list
		.map((k) => k.replace(' ', ''))
		.map((k) => `#${k}`)
		.join(sep);
}
