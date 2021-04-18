import { writable } from 'svelte/store';

export const lang = writable({isInit: false, value: 'en'});

export function setLang (navigator: Navigator) {
    const newLang = navigator.language.substring(0,2);
    if (navigator && newLang.length >= 2) {
        console.log("init store");
        lang.set({
            isInit: true, 
            value: newLang
        });
    }
}
