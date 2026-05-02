export function resolveChatHref(href: string, currentHref: string): URL | null {
  try {
    return new URL(href, currentHref);
  } catch {
    return null;
  }
}

export function toInternalChatTarget(href: string, currentHref: string): string | null {
  const resolvedUrl = resolveChatHref(href, currentHref);
  const currentUrl = resolveChatHref(currentHref, currentHref);

  if (!resolvedUrl || !currentUrl) {
    return null;
  }

  if (resolvedUrl.origin !== currentUrl.origin) {
    return null;
  }

  return `${resolvedUrl.pathname}${resolvedUrl.search}${resolvedUrl.hash}`;
}
