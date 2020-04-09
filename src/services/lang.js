
const DEFAULT_LANG = 'en';

export function getLang() {
    return (typeof navigator !== 'undefined') ? navigator.language : DEFAULT_LANG;
}

export function getLangSimplified() {
    return getLang().slice(0, 2).toLowerCase();
}
