export function getIsoDate(date = new Date()): string {
	return getIsoDateStr(date.toISOString());
}

export function getIsoDateStr(dateStr: string): string {
	return dateStr.substring(0, 10);
}
