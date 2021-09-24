export function getLang(navigator: Navigator): string {
	return navigator.language.substring(0, 2);
}