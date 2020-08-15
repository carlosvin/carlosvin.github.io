
export function getIsoDate (date = new Date()) {
    return getIsoDateStr(date.toISOString());
}

export function getIsoDateStr (dateStr) {
    return dateStr.substring(0, 10);
}