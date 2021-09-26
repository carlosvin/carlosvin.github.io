import path from 'path';

const BASE_PATH = '/src/routes';

export const routes = Object.keys(import.meta.globEager('/src/routes/**/*.svelte'))
	.filter((file) => isValid(file))
	.map((file) => removeIndex(file))
	.map((file) => path.relative(BASE_PATH, file))
	.map((file) => file.replace('.svelte', ''));

function isValid(file: string) {
	const name = path.basename(file, '.svelte');
	return (
		name.charAt(0) !== '_' &&
		name !== 'sitemap' &&
		!file.includes('posts/') &&
		!file.includes('categories/')
	);
}

function removeIndex(file: string) {
	const baseName = path.basename(file, '.svelte');
	if (baseName === 'index') {
		return path.dirname(file);
	}
	return file;
}
