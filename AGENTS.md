# Agent guidelines

Zola + Pico CSS v2 classless lime (`templates/base.html`). Prefer semantic HTML and Pico defaults over custom HTML, CSS, or JS. Goal: less maintenance and consistent results.

## Stack

- **Templates:** Tera in `templates/`. Posts use `blog-page.html`; static pages use `page.html`; shared UI lives in `templates/partials/`.
- **Content:** Markdown in `content/` with YAML front matter (`---`). The section file `content/_index.md` uses TOML (`+++`).
- **CSS:** Pico classless first, then `static/css/base.css` for gaps Pico does not cover (card wrap, search dropdown, icon filters).
- **Search:** Zola elasticlunr (`config.toml`) plus `static/js/search.js`. Do not replace it.
- **Config / pin:** `config.toml` (tags, feeds, sitemap, highlighting). Keep the Zola version in `.github/workflows/main.yml` and `.cursor/install.sh` in sync.

## Prefer the stack

- Site URLs and static assets: `get_url` and `get_taxonomy_url`. Page links: `page.permalink`. Do not invent path helpers.
- Reuse partials (`nav`, `post-card`, `post-list`, `post-tags`, `og`, `json-ld`) and the `preview_url` component in `templates/macros.html`.
- Prefer semantic HTML (`header` / `nav` / `main` / `article` / `footer` / `hgroup` / `figure` / `aside`) and let Pico classless style it directly. Use classes only for stable layout, accessibility, or state hooks where an element or ARIA selector would be ambiguous or brittle. UI: native `details`, `role="switch"`, and `<input type="search">`. Theme: `data-theme` with the existing `theme-change` script.
- Posts: `title`, `date`, `description`; optional `taxonomies.tags` and `extra.preview_image`. Hide from the home list with `extra.unlisted`. Use `page.description` (fallback `page.summary`) and Zola `reading_time`. Show `word_count` on the article page, not listing cards.
- Code highlighting: `config.toml` `[markdown.highlighting]`. No client-side highlighter.

## Do not

- Add another SSG, CSS framework, component library, or JS UI kit.
- Grow `base.css` into a design system or a custom color/dark-mode palette.
- Duplicate SEO or social markup outside `partials/og.html` and `partials/json-ld.html`.
- Hand-roll tags, pagination, feeds, or the sitemap.

## Verify

`zola build` (or `.cursor/install.sh`). Preview: `zola serve --interface 0.0.0.0 --port 1111`.
