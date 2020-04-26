export function toSlug (str) {
    return str
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

export function toCapitalize (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toHashtags(list, sep=' '){
    return [...list.map(k => `#${k}`)].join(sep);
}