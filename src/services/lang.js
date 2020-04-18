
import {DEFAULT_LANG, SITE_DESCRIPTION} from '../conf';

export function getLang() {
    return (typeof navigator !== 'undefined') ? navigator.language : DEFAULT_LANG;
}

export function getLangSimplified() {
    return getLang().slice(0, 2).toLowerCase();
}

export function getDescription(lang = undefined) {
    if (lang in SITE_DESCRIPTION) {
        return SITE_DESCRIPTION[lang];
    } else {
        lang = getLang();
        if (lang in SITE_DESCRIPTION) {
            return SITE_DESCRIPTION[lang];
        } else {
            return Object.values(SITE_DESCRIPTION)[0];
        }
    }
}