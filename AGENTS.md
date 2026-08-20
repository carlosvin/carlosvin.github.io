# Agent Guidelines

Static engineering blog built with **Zola** and styled with **Pico CSS (v2, Lime theme)**.

The primary goal is **minimal maintenance burden** and **bulletproof, standard results**. Stick strictly to our chosen stack primitives instead of writing bespoke, one-off solutions.

---

## Tech Stack & Architecture

- **Engine:** [Zola](https://www.getzola.org/) (pinned in `.github/workflows/main.yml` and `.cursor/install.sh`)
- **Styling:** [Pico CSS](https://picocss.com/) (`pico.lime.min.css` in `templates/base.html`)
- **Overrides:** `static/css/base.css` (keep minimal; only for site-specific glue Pico cannot handle)
- **Templates:** Tera templates in `templates/` with reusable partials in `templates/partials/`
- **Content:** Markdown in `content/` with TOML front matter
- **Search:** Built-in elasticlunr (`config.toml` index + `static/js/search.js`)

---

## Core Rules: Prefer the Stack over Reinvention

1. **Leverage Zola Native Features**
   - **URLs & Assets:** Always use `get_url(path=...)` and `get_taxonomy_url(kind="tags", name=...)`. Never hardcode relative/absolute site paths.
   - **Taxonomies:** Use Zola's built-in `tags` taxonomy (`config.toml`). Do not hand-roll tag listing, tag pages, or post grouping.
   - **Metadata & SEO:** Rely on `page.summary`, `page.reading_time`, `page.word_count`, and `config.extra` for social/meta tags (`templates/partials/og.html`, `json-ld.html`).
   - **Reusable Components:** Put reusable template snippets in `templates/partials/` or use Tera components/macros in `templates/macros.html` (e.g., `preview_url`).
   - **Markdown Highlighting:** Configured via `config.toml` `[markdown.highlighting]`; do not pull external client-side syntax highlighters.

2. **Leverage Pico CSS Native Patterns**
   - **Semantic HTML First:** Use `<main class="container">`, `<header>`, `<article>`, `<nav>`, `<aside>`, `<figure>`, and `<hgroup>`. Pico styles semantic tags out of the box.
   - **Built-in UI Controls:** Use Pico standard patterns:
     - Buttons: `<a role="button" class="secondary outline">`
     - Dropdowns: `<details class="dropdown"><summary>...</summary>...</details>`
     - Switches: `<input type="checkbox" role="switch">`
     - Forms: Standard `<input type="search">`, labels, and fieldsets.
   - **Theme Support:** Use standard `data-theme="dark|light"` with `theme-change`. Do not write custom color/dark mode systems.
   - **Minimal CSS Overrides:** Never create a secondary design system in `static/css/base.css`. Only add rules for layout glue (e.g., flex-wrap on cards, sticky sidebar) or minor tweaks that Pico does not natively provide.

3. **Content Conventions**
   - New posts go under `content/` with valid front matter (`title`, `date`, `description`, optional `taxonomies.tags`, optional `extra.preview_image`).
   - Use standard Markdown formatting. Keep elements clean and accessible.

---

## Development & Verification

- **Install/Verify:** Run `.cursor/install.sh` or `zola build` to verify templates and content compile cleanly without broken links or syntax errors.
- **Local Dev Server:** `zola serve --interface 0.0.0.0 --port 1111`
