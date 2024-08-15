export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9')
];

export const server_loads = [2];

export const dictionary = {
		"/": [3],
		"/categories": [4],
		"/langs": [5],
		"/langs/[lang]/categories": [~6,[2]],
		"/langs/[lang]/categories/[slug]": [~7,[2]],
		"/langs/[lang]/posts": [~8,[2]],
		"/langs/[lang]/posts/[slug]": [9,[2]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.js';