import fs from 'fs';

export const routes = [''];

fs.readdirSync('./src/routes').forEach((file) => {
	file = file.split('.')[0];
	if (
		file.charAt(0) !== '_' &&
		!file.startsWith('sitemap') &&
		file !== 'index' &&
		!file.startsWith('[')
	) {
		routes.push(file);
	}
});
