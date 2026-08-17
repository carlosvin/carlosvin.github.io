---
name: reference-tech-stack
description: "Companion to tanstack-promptable-fullstack-app-template. Documents
  this template's opinionated vendor choices — Zod, Mantine, lucide-react,
  MongoDB + seed, jose JWT auth, OpenAI adapter, pino + Sentry, react-markdown,
  Biome, Vitest, Playwright, Netlify — so agents implement against the reference
  app without baking those choices into the architecture skill. Companion
  skills: tanstack-promptable-fullstack-app-template (parent),
  observability-and-env (companion). Install missing companions with npx skills
  add carlosvin/tanstack-fullstack-ai-template --skill <id>. Project: TanStack
  AI-Promptable Full-Stack Template. Triggers on \"reference tech stack\",
  \"opinionated stack\", \"which UI library\", \"use Mantine\", \"use Zod\",
  \"MongoDB repository\", \"lucide icons\", \"Biome lint\", \"Netlify deploy\",
  \"template defaults\", \"stack choices\"."
---

> This file is generated from `skills/src/*.skill.yaml`. Do not edit manually.

## Companion skills (install if missing)

This template publishes **multiple** skills. If only **this** skill is installed, add companions **before** related work:

- **`tanstack-promptable-fullstack-app-template`** (parent) — Architecture contract — schema layers, server boundaries, AI tools, and middleware-inferred request context. Vendor-agnostic; install for all TanStack work.
  ```bash
  npx skills add carlosvin/tanstack-fullstack-ai-template --skill tanstack-promptable-fullstack-app-template
  ```

- **`observability-and-env`** (companion) — Env parse, logger factories, and error-tracking bootstrap. This stack skill names pino + Sentry; that companion owns the setup recipe.
  ```bash
  npx skills add carlosvin/tanstack-fullstack-ai-template --skill observability-and-env
  ```

Discover all skills: `npx skills add carlosvin/tanstack-fullstack-ai-template --list`

# Reference Tech Stack (Opinionated Defaults)

**Purpose:** Name the **concrete packages** this template uses so agents can
implement and extend the **reference app** without re-introducing vendor
coupling into the architecture skill.

> **Parent skill:** `tanstack-promptable-fullstack-app-template` — architecture
> (vendor-agnostic). Load that for schemas, routes, AI tools, and boundaries.
>
> **Companion:** `observability-and-env` — env parse, pino factories, Sentry
> bootstrap. This skill only records that we chose pino + Sentry.
>
> **Handbook:** [AGENTS.md](https://github.com/carlosvin/tanstack-fullstack-ai-template/blob/main/AGENTS.md)
> — file layout, snippets, and validation commands.

## Skill routing

| Task | Load |
|------|------|
| "What does this template use for X?" / scaffold matching the demo app | **This skill** |
| Architecture, schemas, routes, AI tools, server boundaries | **`tanstack-promptable-fullstack-app-template`** |
| Env schemas, `shellSession`, logging/Sentry bootstrap | **`observability-and-env`** |
| Day-to-day file paths and UI/auth/AI how-to | **AGENTS.md** |

## Stack map (this repository)

| Concern | Choice | Primary packages / notes | Handbook |
|---------|--------|--------------------------|----------|
| Runtime validation | **Zod** | `zod` — tools, repo, router search, env | Architecture skill samples; `src/services/schemas/`, `src/env/` |
| UI kit | **Mantine** | `@mantine/core`, `@mantine/hooks`, `@mantine/notifications` | AGENTS.md §3 |
| Icons | **lucide-react** | One icon library; do not mix Tabler | AGENTS.md §3 |
| Database | **MongoDB + seed** | `mongodb`; in-memory seed when unset | AGENTS.md §6; `src/services/repository/` |
| Auth | **JWT header** | `jose` (unsigned/`alg:none` accepted in template); `Authorization` header | AGENTS.md §5 |
| AI adapter | **OpenAI** | `@tanstack/ai-openai`; `OPENAI_API_KEY` | AGENTS.md §8 |
| Chat markdown | **react-markdown + remark-gfm** | GFM tables/links/code in `ChatDrawer` | AGENTS.md §8 |
| Logging | **pino** (+ `pino-pretty` in TTY) | Via `createServerLogger` | **`observability-and-env`**; AGENTS.md §9 |
| Error tracking | **Sentry** | `@sentry/tanstackstart-react`; `SENTRY_DSN` | **`observability-and-env`**; AGENTS.md §9 |
| Lint / format | **Biome** | `@biomejs/biome` — not ESLint/Prettier | AGENTS.md §11 |
| Unit tests | **Vitest** + Testing Library | jsdom; `renderWithProviders` | AGENTS.md §10 |
| E2E | **Playwright** | Chromium; seed repo; auth via JWT headers | AGENTS.md §10 |
| Deploy | **Netlify** | `@netlify/vite-plugin-tanstack-start`; Git deploy previews | AGENTS.md CI/CD; `netlify.toml` |
| Package manager | **pnpm** | Lockfile committed | AGENTS.md §12 / §15 |

**Fixed (not listed as choices):** TanStack **Start**, **Router**, **AI**, Intent, and CLI — owned by the architecture skill.

## How to use these defaults

1. Prefer the stack map when extending *this* repo or cloning the template as-is.
2. Do not add a second library for the same concern unless you are intentionally migrating.
3. Keep interfaces when swapping (repository, `AIAdapterService`, `ObservabilityService`); update this stack map and AGENTS.md; leave the architecture skill vendor-agnostic.
4. UI and schema *how-to* live in AGENTS.md §3 / architecture skill — this skill only names packages.

## Verification

After stack-affecting changes: `pnpm skills:build`, `pnpm skills:check`, and AGENTS.md §15.
