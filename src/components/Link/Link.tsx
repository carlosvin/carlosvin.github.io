import { Link as RouterLink } from "@tanstack/react-router";
import { type ComponentProps, forwardRef } from "react";

type RouterLinkProps = ComponentProps<typeof RouterLink>;

/**
 * Wraps TanStack Router links with project defaults.
 * Preserves current search params and intent preloading unless callers opt out.
 */
const InternalLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(
  { preload = "intent", search = true, ...props },
  ref,
) {
  return <RouterLink ref={ref} preload={preload} search={search} {...props} />;
});

InternalLink.displayName = "Link";

export const Link = InternalLink as typeof RouterLink;
