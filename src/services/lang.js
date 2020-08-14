
import {DEFAULT_LANG, SITE_DESCRIPTION, SITE_NAME, FEED_URL} from '../conf';

export function getLang() {
    return (typeof navigator !== 'undefined') ? navigator.language : DEFAULT_LANG;
}

export function getLangSimplified() {
    return getLang().slice(0, 2).toLowerCase();
}

export function getDescription(lang = undefined) {
    return getConfValue(SITE_DESCRIPTION, lang);
}

export function getSiteName(lang = undefined) {
    return getConfValue(SITE_NAME, lang);
}

export function getFeedUrl(lang){
    if (!lang) {
        lang = getLangSimplified();
    }
    return `${FEED_URL}/${lang}.xml`;
}

export function getConfValue(value, lang = undefined) {
    if (lang in value) {
        return value[lang];
    } else {
        lang = getLangSimplified();
        if (lang in value) {
            return value[lang];
        } else {
            return Object.values(value)[0];
        }
    }
}
