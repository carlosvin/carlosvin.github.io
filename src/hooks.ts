import type { Handle } from '@sveltejs/kit';

function getLang(pathname: string) {
	const parts = pathname.split('/');
	let i = 0;
	for (const part of parts) {
		i++;
		if (part == 'langs') {
			break;
		}
	}
	return parts[i];
}

export const handle: Handle = async ({ request, resolve }) => {
	const response = await resolve(request);

	// read language slug
	const lang = getLang(request.url.pathname);

	// replace html lang attribute with correct language
	if (response.body && lang) {
		const body = response.body.toString();
		response.body = body.replace('<html lang="en">', `<html lang="${lang}">`);
	}
	return response;
};
