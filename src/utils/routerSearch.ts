export function parseRouterSearch(searchString: string): Record<string, unknown> {
  const normalizedSearch = searchString.startsWith("?") ? searchString.slice(1) : searchString;
  const searchParams = new URLSearchParams(normalizedSearch);
  const parsedSearch: Record<string, unknown> = {};

  for (const [key, value] of searchParams.entries()) {
    const existingValue = parsedSearch[key];

    if (existingValue === undefined) {
      parsedSearch[key] = value;
      continue;
    }

    if (Array.isArray(existingValue)) {
      existingValue.push(value);
      continue;
    }

    parsedSearch[key] = [existingValue, value];
  }

  return parsedSearch;
}

export function stringifyRouterSearch(search: Record<string, unknown>): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(search)) {
    appendSearchParam(searchParams, key, value);
  }

  const serializedSearch = searchParams.toString();
  return serializedSearch ? `?${serializedSearch}` : "";
}

function appendSearchParam(searchParams: URLSearchParams, key: string, value: unknown): void {
  if (value === undefined || value === null || value === "") {
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      appendSearchParam(searchParams, key, item);
    }
    return;
  }

  searchParams.append(key, String(value));
}
