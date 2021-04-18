import { writable } from 'svelte/store';

export const lang = writable('en');

export function setLang (navigator: Navigator) {
    const newLang = navigator.language.substring(0,2);
    if (navigator && newLang.length >= 2) {
        lang.set(newLang);
    }
}
