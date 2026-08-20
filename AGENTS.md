# Agent guidance

This is a static blog built with **Zola** and styled with **Pico CSS**. Prefer those stack defaults over custom implementations. The goal is lower maintenance and consistent, professional results—not one-off solutions.

## Tech stack

- **SSG:** [Zola](https://www.getzola.org/) (pinned in `.github/workflows/main.yml` and `.cursor/install.sh`)
- **CSS:** [Pico CSS](https://picocss.com/) v2, lime theme (`pico.lime.min.css` in `templates/base.html`)
- **Site-specific CSS only:** `static/css/base.css` (gaps Pico does not cover)
- **Templates:** Tera in `templates/`
- **Content:** Markdown in `content/`

Do not introduce another SSG, CSS framework, component library, or JS UI kit unless the task explicitly requires it.

## Prefer the stack over reinventing the wheel

When a Zola or Pico CSS feature already solves the problem, use it. Do not implement a parallel version in custom HTML, CSS, or JavaScript.

### Zola first

Use Zola’s built-ins before writing custom logic:

- Templates, inheritance, includes, and macros (`templates/`)
- Sections, pages, front matter, and `extra` for site-specific metadata
- Taxonomies (tags are already configured in `config.toml`)
- `get_url`, `get_taxonomy_url`, pagination, feeds, sitemap, search index
- Markdown rendering and syntax highlighting (`config.toml` `[markdown]`)
- Shortcodes for reusable content snippets

Avoid hand-rolled listing/pagination, ad-hoc URL construction, duplicate metadata plumbing, or extra build tools that Zola already provides.

### Pico CSS first

Use Pico’s classless/semantic patterns before adding custom CSS or JS widgets:

- Semantic HTML (`header`, `nav`, `main`, `article`, `footer`, `hgroup`)
- Layout helpers Pico already supports (`container`, grid/flex utilities it documents)
- Native form controls, `role="button"`, `secondary` / `outline`, `dropdown`, `switch`
- Theme attributes Pico and `theme-change` already honor (`data-theme`)

Existing UI already follows this (nav dropdown, search input, tag buttons, post cards). Extend those patterns instead of inventing new ones.

`static/css/base.css` is for **small, site-specific** gaps (search results, blog card wrap, tag spacing, theme-aware icons). Do not grow it into a second design system.

### When custom code is acceptable

Add custom CSS or JS only when Zola or Pico cannot reasonably cover the need (for example Zola’s search index wiring in `static/js/search.js`). Keep that code minimal, documented by usage, and aligned with existing templates.

## Cursor Cloud

Local preview: `zola serve --interface 0.0.0.0 --port 1111` (see `.cursor/environment.json`). Install/build uses `.cursor/install.sh` (same Zola version as CI).
