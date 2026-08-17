# Plan: migrate this Zola blog to TanStack Start (static)

**Status:** proposal only — this document is the deliverable. Implementation should follow it in a later change.

**Current site:** [Zola](https://www.getzola.org/) static blog in this repo (`config.toml`, `content/`, `templates/`, `static/`), published to GitHub Pages at `https://carlosvin.github.io` via `.github/workflows/main.yml` (Zola → `gh-pages`).

**Target:** a TanStack Start app that keeps the same public URLs and content, built as a **fully generated static site**, still deployable to GitHub Pages.

## Explicitly out of scope (this migration)

These are **not required** and must **not** be added in the first implementation:

| Item | Status |
| --- | --- |
| **MongoDB** | Out of scope. Content stays files in `content/`. No database, no `MONGODB_URI`, no mongo repository. |
| **JWT / auth** | Out of scope. Public read-only site. No `jose`, no auth middleware, no `requireAuthMiddleware`, no `TraceabilityContext` writes. |
| **Netlify** | Out of scope. Production host remains **GitHub Pages**. No `@netlify/vite-plugin`, no `netlify.toml`, no Netlify Functions. |
| **TanStack AI** | **Next iteration only.** No `@tanstack/ai`, no chat drawer, no `toolDefinition` / `createSafeServerTool`, no OpenAI keys. Do not stub a disabled chat UI. |

The architecture skill still applies: interface-first `ReadRepository`, schema layers, thin routes, isomorphic loaders, env parse-once. Contract items that exist only for mutations, auth tickets, and AI tool coverage are **deferred**, not implemented as no-ops.

---

## Direct answers

### Can the three template skills drive this migration?

**Yes, as the architecture contract — not as a clone of the task-tracker demo.**

Install (already done in this branch):

```bash
npx skills add carlosvin/tanstack-fullstack-ai-template --skill tanstack-promptable-fullstack-app-template
npx skills add carlosvin/tanstack-fullstack-ai-template --skill observability-and-env
npx skills add carlosvin/tanstack-fullstack-ai-template --skill reference-tech-stack
```

| Skill | Use for this blog | Leave unused this iteration |
| --- | --- | --- |
| `tanstack-promptable-fullstack-app-template` | Interface-first **read** repository, Zod schema layers, thin file routes, loaders that only call `createServerFn`, URL-as-state for filters/search, parent layouts, import protection | Task CRUD, JWT, Mongo, POST mutations, AI tools, auth tickets |
| `observability-and-env` | Parse env once, `webEnvMiddleware`, `shellSession` / `getBrowserShellSession`, optional Sentry + pino behind `ObservabilityService` | Runtime Node server assumptions; secrets that do not exist on GitHub Pages |
| `reference-tech-stack` | Zod, Mantine, lucide-react, Biome, Vitest, Playwright, pnpm | MongoDB, jose JWT, OpenAI adapter, Netlify deploy plugin |

The architecture skill is **vendor-agnostic** for database and deploy. A markdown `ReadRepository` + GitHub Pages SSG is the chosen stack, not a temporary stand-in for Mongo/Netlify.

### Can it be deployed to GitHub Pages?

**Yes, if and only if the production build is static HTML + assets.** GitHub Pages is a static file host. It cannot run TanStack Start SSR or a live Node server. That is acceptable: this migration does not need those.

This user/org site (`carlosvin.github.io`) is served from the **site root** (`/`), so there is no project-pages `basename` problem. The existing workflow already publishes a generated tree to `gh-pages`.

**SPA-only mode is the wrong primary strategy for this blog.** A SPA shell (`/_shell.html` + 404 fallback) would:

- Break first-load SEO for posts (crawlers get a pending shell, not article HTML).
- Make RSS/Atom, sitemap, and Open Graph harder.
- Force GitHub Pages 404 hacks for deep links.

**Use static prerendering (SSG) as the production mode**, with **static server functions** for data. That is the Generate Static Site pattern TanStack Start documents:

- [Static prerendering](https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering)
- [Static server functions](https://tanstack.com/start/latest/docs/framework/react/guide/static-server-functions) (experimental)

### Should we use static server functions?

**Yes — that is the right data layer for GitHub Pages.**

`staticFunctionMiddleware` on GET `createServerFn`s:

1. Runs the handler **at prerender/build time**.
2. Writes a JSON artifact keyed by function id + payload hash.
3. Embeds the result in prerendered HTML.
4. On the client, later calls fetch that **static JSON** instead of a live `/_serverFn` endpoint.

That matches how a blog works: content is files in git; nothing needs a runtime server.

All content server functions are **GET-only**. There are no POST mutations, auth, or streaming endpoints in this migration.

---

## What must be preserved (parity)

From the current Zola site:

| Feature | Today | Target |
| --- | --- | --- |
| Post URLs | Folder/file slug, e.g. `/cpp-pragma-pack/`, `/rest-urls/` | Same paths (`autoSubfolderIndex: true`) |
| Legacy aliases | Many `aliases:` to `/langs/en/posts/...`, `/blog/...` | Prerender redirect HTML (or duplicate pages) at those paths |
| Markdown + YAML frontmatter | Mixed `---` YAML; `_index.md` uses `+++` TOML | Keep `content/` as source of truth; parse YAML (and TOML for section files if kept) |
| Section posts with assets | `content/<slug>/index.md` + sibling images (`./5b.png`) | Copy page assets next to prerendered HTML or under `/content-assets/<slug>/` with rewritten URLs |
| Tags | `taxonomies.tags`, paginate_by 10 | `/tags/`, `/tags/$tag/`, optional `?page=` search param |
| About | `unlisted: true`, nav to `/about` | Listed in nav, omitted from home feed |
| Search | elasticlunr JSON index | Build-time index JSON via a static server fn + client search (or MiniSearch) |
| Feeds | `atom.xml`, `rss.xml` | Generate at build (Vite plugin or prerendered routes) |
| SEO | sitemap, robots, OG, JSON-LD | Equivalent head tags per route + generated sitemap/robots |
| Comments | Utterances on post pages | Same client widget |
| Analytics | Clarity + Umami | Same scripts in root layout |
| Theme | Pico CSS + theme-change | Mantine color scheme (reference stack) or a thin blog theme; do not mix two UI kits |
| PWA bits | `static/manifest.json`, icons | Copy into `public/` |
| IndexNow ping | workflow curl after deploy | Keep in GitHub Actions |

Existing public URLs must not 404. That is a hard requirement.

---

## Architecture (skill-compliant, blog-shaped)

Domain entity is a **Post**, not a Task. Apply the same layers.

```
content/*.md  →  MarkdownReadRepository (*.server.ts)
              →  mappers (repo schema ↔ tools schema)
              →  GET createServerFn + staticFunctionMiddleware
              →  route loaders (call server fns only)
              →  Mantine page components
```

### Repository (interface-first)

```ts
interface ReadRepository {
  listPosts(filter?: PostRepoFilter): Promise<PostListItemRepo[]>
  getPost(slug: string): Promise<PostRepo | null>
  listTags(): Promise<TagRepo[]>
  listPostsByTag(tag: string, filter?: PostRepoFilter): Promise<PostListItemRepo[]>
  getSearchDocuments(): Promise<SearchDocRepo[]>
  getSite(): Promise<SiteRepo>
}
```

- **Filesystem implementation (production):** read `content/` at build time (`gray-matter` / `unified` + `remark`/`rehype`). This is the only repository implementation.
- **No `WritableRepository`.** The site is read-only. Do not add Mongo, a CMS, or write APIs.

No JWT, no `TraceabilityContext`, no `requireAuthMiddleware`. Skill items about auth tickets and mutations stay unused until a future iteration that actually adds writes.

### Schema layers

1. **Repository:** raw frontmatter + HTML/AST, file path, aliases, unlisted flag.
2. **Server-fn (API-shaped):** `PostListItem`, `PostDetail` (html, toc, tags, dates), `Tag`, `SearchDoc`, `SiteConfig`. Same schemas the loaders consume. No AI `toolDefinition` layer in this iteration.
3. **Router search:** `{ q?: string; tag?: string; page?: number }` on list/search routes; debounced free-text search (skill special pattern).

### Server functions (all GET + static middleware)

Centralize in `src/services/api/serverFns.ts`:

- `getSite`
- `getPosts` (filter/sort/page)
- `getPost` (slug)
- `getTags` / `getTag`
- `getSearchIndex`

`staticFunctionMiddleware` **last** on each. Loaders only call these.

### Routes (thin)

| Route | Notes |
| --- | --- |
| `/` | Home list; loader `getPosts`; `validateSearch` for `q` / `page` |
| `/about` | `getPost('about')` or dedicated page type |
| `/posts/$slug` **or keep root slugs** | Prefer **root slugs** (`/$slug`) to match Zola today — implement as a file route that does not collide with `/about`, `/tags` |
| `/tags` | Tag index |
| `/tags/$tag` | Filtered list |
| `/search` | Optional dedicated page; or overlay on home |

**Slug collision:** Zola uses top-level paths. Keep `/$slug` for posts and reserve static segments (`about`, `tags`, `search`). Parent layout owns nav, `shellSession`, analytics.

**Prerender dynamic `$slug` / `$tag`:** automatic discovery skips param routes. Enable `prerender.enabled` + `crawlLinks: true`, and/or pass explicit `pages: [{ path }]` from a small Node script that lists slugs/tags/aliases before Vite prerender.

### AI — later iteration (not this migration)

Do not implement TanStack AI now:

- No chat UI, no `/api/chat`, no `getAIAvailability`, no client tools (`navigate` / `invalidateRouter` for an assistant).
- Do not add AI packages or API keys.
- A later iteration can wrap the existing GET server functions as read-only tools. That work needs a **runtime server** (or a separate API), which this GitHub Pages site does not have — so it is a separate project decision, not a hidden dependency of the SSG cutover.

### Observability

Follow `observability-and-env` with a **browser-heavy** profile:

- `WebServerEnvSchema` may be empty of secrets in production GH Pages.
- `shellSession` still carries `ENV`, `LOG_LEVEL`, optional `SENTRY_DSN` (public DSN is OK).
- Sentry browser SDK can run on static pages; **server** `instrument.server.mts` is unused at runtime on GH Pages but still useful for `pnpm dev` / prerender errors.
- Keep Clarity + Umami as today (not Sentry replacements).

### UI

Use **Mantine** (reference stack) for shell, typography, color scheme, Tag badges, Pagination, Table of contents. Render post HTML with a sanitizing pipeline (`rehype-sanitize`) — not `react-markdown` for stored HTML unless you keep MD in the client (prefer compile-to-HTML at build).

Syntax highlighting: Shiki or rehype-pretty-code at build time (replace Zola `solarized-light`).

---

## GitHub Pages deploy design

### Build output

Vite / TanStack Start prerender should emit a tree like:

```
.output/public/
  index.html
  about/index.html
  rest-urls/index.html
  cpp-pragma-pack/index.html
  cpp-pragma-pack/5b.png          # or hashed assets
  tags/index.html
  tags/golang/index.html
  langs/en/posts/rest-urls/index.html   # alias → meta refresh or 301-equivalent HTML
  rss.xml
  atom.xml
  sitemap.xml
  robots.txt
  404.html
  assets/...
```

`autoSubfolderIndex: true` matches GitHub Pages (directory URL → `index.html`).

### Aliases

GitHub Pages has **no** platform redirect file. For each Zola `aliases` entry, prerender a tiny HTML file:

```html
<!doctype html>
<meta charset="utf-8">
<link rel="canonical" href="https://carlosvin.github.io/rest-urls/">
<meta http-equiv="refresh" content="0; url=/rest-urls/">
```

Plus a client `Navigate` if you want SPA follow-through. Keep `canonical` on the real post.

### 404

Prerender a real `404.html` (GitHub Pages serves it for unknown paths). Do **not** copy the SPA shell over `404.html` if posts are fully prerendered — unknown URLs should stay 404.

### Workflow

Replace Zola action with Node:

1. `pnpm install --frozen-lockfile`
2. `pnpm build` (prerender + static server fn cache)
3. Publish `.output/public` (confirm actual dir after first local build; Nitro/Start versions differ) to `gh-pages`
4. Keep IndexNow curl
5. Preview builds: on non-`main` branches, `BUILD_ONLY` artifact (same as today) or GitHub Actions Pages **preview** if enabled

Disable Jekyll: add `.nojekyll` in the publish root so `_assets` / files starting with `_` are not dropped (TanStack may emit `_serverFn` JSON or `_shell` — if those appear, `.nojekyll` is mandatory).

### Local preview of the static tree

`pnpm build && pnpm exec serve .output/public` (or `vite preview`) and click through aliases, tags, and a section post with images.

---

## What not to do

1. **Do not scaffold the full task app** into this repo and then delete tasks. Start from `npx @tanstack/cli` / Start app, then apply skill layers for **Post**.
2. **Do not add MongoDB, JWT, Netlify, or TanStack AI** in this migration.
3. **Do not enable SPA mode as the production site.** Optional: SPA for unpublished local experiments only.
4. **Do not call live `createServerFn` RPC in production** on GitHub Pages. If a function is missing `staticFunctionMiddleware`, client navigations will 404 on `/_serverFn/*`.
5. **Do not import `fs` / gray-matter in route loaders.** Loaders are isomorphic (skill: server execution boundaries). Parsing lives in `*.server.ts` behind server fns.
6. **Do not keep Zola templates as the renderer** while adding React. One generator.
7. **Do not change `base_url` / post slugs** without redirects.

---

## Implementation phases

### Phase 0 — inventory (no user-visible change)

- Enumerate every content file, slug, `aliases`, `unlisted`, tags, dates, relative images, extra files (`create-cmd-tool-golang/meta-viper/the-config.json`).
- Snapshot current production URLs (crawl `carlosvin.github.io` or generate from frontmatter) into `scripts/url-inventory.json` for later link checks.
- Decide renderer: `unified` + remark-gfm + rehype (emoji, code, raw HTML in posts).

### Phase 1 — app skeleton (skill stack, no content yet)

- `pnpm` TanStack Start + Router, Vite, Mantine, Zod, Biome, Vitest.
- `src/env/` + `webEnvMiddleware` + `getBrowserShellSession` on root loader.
- `ObservabilityService` no-op + optional Sentry.
- `tanstackStart({ prerender: { enabled: true, crawlLinks: true, failOnError: true } })`.
- Import protection for markdown/fs packages.
- Dev server works with a hard-coded seed post.

### Phase 2 — markdown repository + static server fns

- Parse `content/` (skip `_index.md` as a post).
- Map Zola frontmatter: `title`, `date`, `updated`, `description`, `slug`, `toc`, `unlisted`, `aliases`, `taxonomies.tags`, `preview_image`, `lang`.
- HTML pipeline + TOC + relative image rewrite.
- Wire `getPosts` / `getPost` / `getTags` with `staticFunctionMiddleware`.
- Routes for home, post, about, tags.
- Explicit prerender page list from inventory (slugs + aliases + tags).

### Phase 3 — parity features

- Search index static fn + header search (debounced; skill pattern).
- RSS/Atom + sitemap + robots.
- Utterances, Clarity, Umami, manifest, favicons from `static/`.
- Pagination for tags (search param `page`, `paginate_by = 10`).
- JSON-LD + OG on post layout.

### Phase 4 — GitHub Pages CI

- New workflow: Node 22, pnpm, build, deploy `gh-pages`.
- Add `.nojekyll`.
- Playwright against `vite preview` of prerendered output: home, one old alias, one section image post, tag page, 404.
- Freeze Zola workflow only after visual/URL checks pass on a preview deploy (Actions artifact or temporary `pages` branch, matching today’s non-main `BUILD_ONLY` job).

### Phase 5 — cutover

- Merge to `main`; confirm `https://carlosvin.github.io` and a sample of alias URLs.
- Remove `config.toml` / `templates/` once unused (keep `content/` and `static/` as sources, or move assets into `public/` + `content/`).

AI (and any host that could run it) is a **later iteration**, after the static site is live.

---

## Suggested package map (reference stack, adapted)

| Concern | Choice |
| --- | --- |
| Framework | TanStack Start + Router |
| Validation | Zod |
| UI | Mantine + lucide-react |
| Content | `gray-matter`, `unified`, `remark-gfm`, `rehype-stringify`, Shiki |
| Data in prod | Markdown `ReadRepository` + static server functions |
| Search | MiniSearch (or elasticlunr) over prerendered JSON |
| Lint | Biome |
| Tests | Vitest (frontmatter parser, mappers) + Playwright (prerendered URLs) |
| Deploy | GitHub Pages (`gh-pages` branch) |
| Database | None |
| Auth | None |
| AI | None this iteration |
| Package manager | pnpm |

---

## Risks

| Risk | Mitigation |
| --- | --- |
| Static server functions are **experimental** | Pin Start version; have a fallback: prerender-only pages that inline loader data without client refetch (still SSG) |
| Markdown HTML / raw HTML in old posts | Snapshot render a few legacy posts; rehype-raw + sanitize allowlist |
| Image and extra file paths | Copy section directories into publish output; test `/cpp-pragma-pack/` and golang extra JSON if linked |
| Client navigation refetching uncached server fns | Every content fn must use `staticFunctionMiddleware`; no POST |
| Bundle size (Mantine + highlighting) | Code-split post page; CSS from Mantine; avoid shipping full Shiki WASM to client if HTML is prerendered |
| Dual CI during migration | Feature branch + `BUILD_ONLY` until cutover |

---

## Success criteria

- `pnpm build` produces a static directory with no required Node server.
- Home, about, every current post slug, every `aliases` path, tag indexes, RSS, sitemap work on GitHub Pages.
- View-source on a post contains the article HTML (not an empty SPA shell).
- Loaders never import `fs` or the markdown parser.
- Skills checklists that apply (schema boundaries, thin routes, env parse-once, no `window.__ENV__`) hold.
- The built app has no Mongo, JWT, Netlify, or TanStack AI dependencies.

---

## Recommended decision

**Proceed with migration on GitHub Pages using TanStack Start prerender + static server functions + a markdown `ReadRepository`.** Use the three skills as the contract for routing, schemas, loaders, and env. **Do not implement MongoDB, JWT, Netlify, or AI in this cutover.** AI can be designed later against the same GET server functions.
