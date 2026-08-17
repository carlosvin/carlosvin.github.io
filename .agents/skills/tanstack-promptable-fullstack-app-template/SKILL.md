---
name: tanstack-promptable-fullstack-app-template
description: "Use when scaffolding a new TanStack Start project, adding domain
  entities, implementing the interface-first repository pattern with
  AI-promptable tools, fixing nested layout routes that duplicate parent
  beforeLoad/loaders, verifying TanStack Router/Start/AI against current docs,
  or enforcing server/client execution boundaries (isomorphic loaders, import
  protection, middleware-inferred request context). For logging, error tracking,
  env schemas, or shellSession setup, load companion skill observability-and-env
  instead. For this template's concrete package defaults, load companion skill
  reference-tech-stack. Companion skills: observability-and-env (companion),
  reference-tech-stack (companion). Install missing companions with npx skills
  add carlosvin/tanstack-fullstack-ai-template --skill <id>. Project: TanStack
  AI-Promptable Full-Stack Template. Triggers on \"fullstack template\",
  \"TanStack Start project\", \"repository pattern\", \"interface-first\", \"new
  app scaffold\", \"nested routes\", \"layout route\", \"beforeLoad\",
  \"tanstack cli\", \"tanstack intent\", \"package skills\", \"client bundle
  leak\", \"server-only\", \"isomorphic loader\", \"process.env in loader\",
  \"import protection\", \"request context\", \"middleware context\",
  \"debounced search\", \"search input\"."
---

> This file is generated from `skills/src/*.skill.yaml`. Do not edit manually.

## Companion skills (install if missing)

This template publishes **multiple** skills. If only **this** skill is installed, add companions **before** related work:

- **`observability-and-env`** (companion) — Logging, error-tracking bootstrap, env schemas, webEnvMiddleware, and shellSession setup. Install when work touches observability, process.env, or browser runtime config.
  ```bash
  npx skills add carlosvin/tanstack-fullstack-ai-template --skill observability-and-env
  ```

- **`reference-tech-stack`** (companion) — Opinionated vendor map for this template's reference app. Install when implementing against the demo stack defaults (UI kit, validator, DB, deploy).
  ```bash
  npx skills add carlosvin/tanstack-fullstack-ai-template --skill reference-tech-stack
  ```

Discover all skills: `npx skills add carlosvin/tanstack-fullstack-ai-template --list`

# TanStack Fullstack Pattern

**Purpose:** Capture the **interface-first, schema-layered, AI-promptable** contract for TanStack Start apps from this template. Day-to-day conventions (UI kit, chat wiring, logging, tests) live in the repo’s **AGENTS.md** — use this skill for **architecture**, AGENTS.md for **operations**.

> **Companion handbook:** [AGENTS.md](https://github.com/carlosvin/tanstack-fullstack-ai-template/blob/main/AGENTS.md) — structure, styling, auth snippets, lint/test tooling, validation checklist, AI chat setup.
>
> **Companion skill:** `observability-and-env` — env schemas, browser shell session, logging/error-tracking bootstrap. Load it for observability work; this skill keeps only the architecture invariants (no vendor-specific logging or APM choices).

## Skill routing

| Task | Load |
|------|------|
| New entity, routes, schemas, AI tools, auth, server boundaries | **This skill** |
| Logging, error tracking, `instrument.*.mts`, `src/env/`, `shellSession`, env leaks | **`observability-and-env`** |
| "Which package does this template use?" / match the demo app stack | **`reference-tech-stack`** |
| Architecture + env/logging | **This skill** + **`observability-and-env`** |
| Scaffolding this template as-is | **This skill** + **`reference-tech-stack`** (+ observability when touching env) |

## How to use this skill

1. Read **Core Contract** first — it is the non-negotiable architecture.
2. Run the **Architecture Checklist** before every non-trivial change.
3. Jump to **Server execution boundaries**, **Schema Boundaries**, **Request Context**, or **Special Patterns** only when that concern applies.
4. Use **[AGENTS.md](https://github.com/carlosvin/tanstack-fullstack-ai-template/blob/main/AGENTS.md)** for operational how-to — not for inventing alternate architecture. **This skill is vendor-agnostic** for UI kits and observability SDKs. Concrete packages for *this* template live in companion skill **`reference-tech-stack`**; env/logging setup lives in **`observability-and-env`**.

## Fixed vs swappable stack

**Fixed by this skill (TanStack):** TanStack **Start**, **Router**, and **AI** (server functions, middleware, file routes, `validateSearch`, loaders, `chat()` / tools / SSE). Use **TanStack Intent** and **`@tanstack/cli`** for current docs.

**Swappable (not prescribed here):** runtime validation, database, auth mechanism, AI provider, observability vendors, UI kit, markdown renderer, lint/test/deploy tooling. Patterns stay interface-first (`Schema.parse()`, repository interfaces, `AIAdapterService`, `ObservabilityService`).

Concrete packages for *this* template: companion skill **`reference-tech-stack`**. Env/logging bootstrap: **`observability-and-env`**.

Pick **one validator library** per app and use it consistently across router search, server-fn validators, and AI tool schemas. Code samples below use **Zod as the reference syntax** (see **`reference-tech-stack`**); translate idioms when using ArkType or Valibot.

## Common failure modes (avoid these)

- **Route state in React state:** filters, tabs, or selections in `useState` instead of validated URL search params + `loaderDeps`.
- **Navigate on every search keystroke:** binding a free-text search input to URL search params with `navigate` on each `onChange` re-runs loaders and drops characters. Use an uncontrolled input + debounced callback (see **Special Patterns**).
- **Repository schemas at the wrong edge:** importing repository-layer schemas into UI, tools, or AI tool inputs — use tools-layer schemas only.
- **Server function without a tool:** adding `createServerFn` but skipping `toolDefinition` + `createSafeServerTool` for the same capability.
- **Parse only half the boundary:** validating inbound tools input but returning raw repo rows to UI/AI without tools-layer `Schema.parse` on the way out.
- **UI-only auth:** hiding buttons in components but skipping guards in server handlers.
- **Type escape hatches:** `any`, loose `Record<string, unknown>`, or `as` after `Schema.parse` — narrow, guard, or fix types instead.
- **Duplicated parent work:** copying a parent layout’s `beforeLoad`, loader, or expensive read into each child route.
- **Server logic in loaders:** `process.env` secrets, DB drivers, or repository imports inside a route `loader` or route file top-level imports.
- **Wrong server primitive:** `createServerFn` for internal singletons that must never be RPC-callable — use `createServerOnlyFn` instead.
- **Leaky module graph:** server modules without `*.server.ts` or `import '@tanstack/react-start/server-only'` pulled into files consumed by UI.
- **Runtime context guards:** `getShellAuthContext`, `getAccessTicket`, `accessTicketFrom`, or property-presence checks on middleware-assembled `context` — chain the middleware and read `ctx.context` directly (Start infers types).
- **Context type bypasses:** `context as AuthContext`, `as unknown`, or `as any` on request context — chain middleware so TypeScript infers context.
- **Secrets in the browser:** returning `serverEnv` or raw env to loaders/components — project through `shellSession` only.

## Core Contract

1. **Interfaces:** Database, AI, observability (and other externals) sit behind interfaces; implementations are swappable.
2. **Schemas as the type source:** Wire and tool shapes use a runtime validator (Zod, ArkType, Valibot, …) with **schema-inferred types**. Hand-written interfaces define **behavior** (`ReadRepository`, `AIAdapterService`, …), not ad-hoc JSON types.
3. **Three schema layers:** **Repository** (DB-shaped), **tools / server-fn** (API-shaped, shared between `createServerFn` and `toolDefinition`), **router search** (URL-shaped). Translate with `Schema.parse()` at each boundary.
4. **TypeScript inside the typed flow:** After schema boundaries, preserve **inferred types end-to-end** — prefer `satisfies`, discriminated unions, `as const` tuples, narrow **type guards**, and **exhaustive `switch`** (e.g. `default` branch calling `assertNever`) over `any`, broad `unknown` plumbing, or `as` casts (only use `as` at documented third-party/library seams per AGENTS.md).
5. **Repository vs tools:** Repository implementations use repository-layer schemas only. **Server functions and AI tools share the same tools-layer schemas** (`.inputValidator` / `toolDefinition` inputSchema + `Schema.parse`). UI and AI consume tools-layer types only — never import repository schemas at those edges.
6. **Server functions:** GET queries throw on failure; POST mutations chain `.middleware([requireAuthMiddleware, invalidateMiddleware])`; handlers return data or throw `HttpError`; callers normalize with `processResponse` / `safeToolHandler` / `createSafeServerTool`.
7. **Routes:** Thin route files (`createFileRoute`, `validateSearch`, `loaderDeps`, `loader`, `component`); page UI in `src/components/`. **Loaders** fetch via server functions — no `useEffect` data fetching for route data.
8. **URL-as-state:** Filters, tabs, selections in validated **search** params; use `loaderDeps` so only relevant search fields key the loader cache.
9. **Router config bundle:** ship a project-local `Link` wrapper with `search: true` default (use it for every internal link) **and** these router defaults together: `defaultStaleTime`, `defaultPreload: 'intent'`, `defaultPreloadStaleTime: 0`, `scrollRestoration: true`, `notFoundComponent`.
10. **Auth ticket built in middleware:** auth middleware enriches `ctx.context` with a repository-built ticket (e.g. `getReadRepository().getUserAccess(email)`) carrying identity, roles, and guards; `WritableRepository` mutations accept a `TraceabilityContext` (`createdBy`, `lastModifiedBy`, …) constructed from that ticket so writes are attributed consistently across UI and AI.
11. **AI tool coverage:** expose **every** repository method as a server AI tool via `createSafeServerTool`; add **distinct-values** tools for enum-ish filters; expose `navigate` and `invalidateRouter` as client tools.
12. **Promptable by default:** root loader checks `getAIAvailability()` and only mounts chat UI when configured (no disabled state). Chat input includes a `browserContext` (timezone, locale, path) consumed by `buildSystemPrompt` alongside the auth ticket.
13. **Bound the agent loop:** every `chat()` call sets `agentLoopStrategy: maxIterations(N)` explicitly (default `N=10`); tune after measuring — do not rely on the framework default.
14. **Metadata for AI and UI:** Attach human-readable **descriptions** to schema fields (reference — Zod `.describe()` → JSON Schema `description`; ArkType/Valibot have equivalents). Use **structured schema extras** only for non-description hints — `unit`, `format`, optional `title`. Prefer deriving prompts and UI copy from schemas + JSON Schema export and router introspection over parallel hand-maintained maps.
15. **Parent layouts:** Shared `beforeLoad`, redirects, and expensive reads belong on the **parent** layout route; children read parent loader data via `getRouteApi` / `useLoaderData({ from })` — do not duplicate parent work.
16. **Server execution boundaries:** Route loaders are **isomorphic** — they run on the server during SSR and on the client during SPA navigations. Loaders only **call** exported `createServerFn` from `serverFns.ts` (e.g. `getTasks({ data: deps })`). DB access, secrets, and Node-only SDKs live in `*.server.ts` or behind `createServerOnlyFn`; extend `tanstackStart({ importProtection })` when adding node packages.
17. **Startup-validated env + typed context + browser shell:** Parse env once at startup into `webServerEnv` and `shellSession`; inject via `next({ context })`; chain middleware for inferred types; expose browser-safe config only through `getBrowserShellSession` / `shellSession` — never `serverEnv` or `window.__ENV__`. **Setup recipe:** companion skill `observability-and-env`.

## Architecture Checklist

Scan before changing code:

- **One tools-layer schema per wire shape:** `createServerFn` `.inputValidator(Schema)` and AI `toolDefinition({ inputSchema })` share the same schema — no duplicate hand-written wire types.
- **Parse both directions:** tools → repository inputs and repository rows → tools/API outputs each end in the target layer’s `Schema.parse()` (pure mapper functions are fine if the final step is always `.parse()`).
- **No type erasure:** after `Schema.parse`, carry **schema-inferred types** through server functions, repos, tools, and components — do not widen back to `Record<string, unknown>` / `any`.
- **Repository interfaces = repo-layer types only:** mapping lives beside schemas / mappers — not in React components.
- **Auth ticket is repository-backed and server-enforced:** middleware builds the ticket (e.g. `getReadRepository().getUserAccess(email)`); guards run in **server handlers**, never UI-only.
- **Writes use `TraceabilityContext`:** pass audit fields from the ticket (or stock `context.user.email`) through a single context object on `WritableRepository` mutations — avoid sprinkling raw `email` arguments. Repository implementations must **persist** `createdBy` / `lastModifiedBy` from that context onto the entity.
- **Navigation is one decision:** ship the **router defaults bundle** and the **project `Link` wrapper** (`search: true`) together so URL state survives navigation.
- **AI stack is complete:** every repo method → server tool + safe handler; client **`navigate`** / **`invalidateRouter`**; root **`getAIAvailability()`**; chat payload includes **`browserContext`**; **`chat({ agentLoopStrategy: maxIterations(N) })`**.
- **Routes:** **`validateSearch`** + **`loaderDeps`**; duplicate **`beforeLoad`** / shared loaders only on **parent** layouts.
- **Metadata discipline:** schema field descriptions for narrative copy; structured extras for units/formats; closed vocabularies = `as const` tuple + schema enum + inferred type.
- **Server boundaries:** loaders call `serverFns` only — no `process.env` secrets, DB drivers, or repo imports in route files; `*.server.ts` for DB drivers / Node SDKs; `createServerOnlyFn` for non-RPC infra; `importProtection` updated for new node packages.
- **Request context:** middleware validates once; handlers **chain middleware** and read `context.*` directly — no runtime context helpers, no context casts, no Register; browser sees only **`getBrowserShellSession`** output (env bootstrap: **`observability-and-env`**).

## Server execution boundaries

TanStack route **loaders are isomorphic** — they run during SSR **and** on client-side navigations. Treat every route module as potentially shipping to the browser.

### Forbidden in route files

- Top-level imports of `getDb`, repositories, database drivers, `fs`, or other Node-only modules.
- `process.env` for secrets inside `loader` bodies.
- Inline DB queries or repository calls inside `loader`.

### Required pattern

Define reads/writes in [`src/services/api/serverFns.ts`](src/services/api/serverFns.ts). Route loaders only invoke them:

```typescript
// src/routes/tasks/index.tsx — thin route
export const Route = createFileRoute('/tasks/')({
  validateSearch: TasksSearchSchema,
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => getTasks({ data: deps }),
})
```

```typescript
// src/services/api/serverFns.ts — server-only handler body
export const getTasks = createServerFn({ method: 'GET' })
  .inputValidator(TaskFilterSchema.optional())
  .handler(async ({ data: filter }) => {
    const repoFilter = filter ? TaskRepoFilterSchema.parse(filter) : undefined
    return getReadRepository().getTasks(repoFilter)
  })
```

### File naming and tripwires

- **`*.server.ts` / `*.server.tsx`:** DB clients, repositories with drivers, private API keys, Node-only SDKs (e.g. `mongoClient.server.ts`, `getRepository.server.ts`).
- **When rename is awkward:** first line `import '@tanstack/react-start/server-only'`.

### `createServerFn` vs `createServerOnlyFn`

| Primitive | Use when |
|-----------|----------|
| `createServerFn` | Loaders, mutations, and AI tools need to trigger server work over RPC (`GET` / `POST`). |
| `createServerOnlyFn` | Internal singletons (DB client factory) that must **never** be client-callable. |

```typescript
import { createServerOnlyFn } from '@tanstack/react-start'
import { getDb } from '../db/mongoClient.server'

export const getDbConnection = createServerOnlyFn(async () => getDb())
```

Do **not** define new `createServerFn` inline in route files — keep RPC entry points centralized in `serverFns.ts`.

### Import protection (Vite)

When adding node-only packages, extend [`vite.config.ts`](vite.config.ts):

```typescript
tanstackStart({
  importProtection: {
    behavior: 'error',
    client: {
      // Reference template uses mongodb + jose — replace with your packages
      specifiers: ['<db-driver>', '<auth-crypto-lib>'],
      files: ['**/services/db/**', '**/repository/*.server.ts'],
    },
  },
})
```

Add your DB driver and auth/crypto libraries when they are not isolated in `*.server.ts`. Set `ignoreImporters: ['**/*.test.ts']` if unit tests import server modules in jsdom. Verify with your build command. Docs: `npx @tanstack/cli search-docs "import protection" --library start`.

### If the user asks for DB/secrets in a component or route config

1. **Stop** — explain the isomorphic loader / client-bundle risk.
2. **Refactor** — move logic to `serverFns.ts`, `*.server.ts`, or `createServerOnlyFn`.

### Rationalizations (reject these)

| Excuse | Reality |
|--------|---------|
| “Loader ran on SSR so it’s server-only” | Loaders re-run on client navigations. |
| “Dynamic import in the loader is enough” | Route module static imports still enter the client graph. |
| “One-line `process.env` read won’t matter” | Isomorphic code can expose env reads to the client bundle. |

## Markdown assistant replies (UX contract)

Assistant messages in the chat UI must **render as Markdown** (including GFM): lists, **tables**, fenced and inline code blocks, and links. Internal paths like `[Tasks](/tasks)` should remain **client-navigable** where the app implements markdown links (do not flatten assistant output to plain text for display). **Renderer choice is project-specific** — follow **AGENTS.md §8** for this repo's implementation.

## Schema Boundaries

`Route search schema → loader → tools schema → server fn → mapping → repo schema → repo`

`repo output → mapping → tools schema → AI or UI`

**Layer 1 — Repository (DB-shaped):** define in `src/services/schemas/repository.ts` (target layout; today some apps still colocate in `schemas.ts`). No field descriptions required here. Infer types from your validator.

**Layer 2 — Tools / server functions (API-shaped):** one schema for `.inputValidator(Schema)` and `toolDefinition({ inputSchema })`; parse args with `Schema.parse(args)`.

*Reference implementation (Zod) — use ArkType or Valibot with TanStack adapters when preferred:*

```typescript
// Example: tools-layer object — .describe() for text; .meta() for non-description fields
const TaskInputSchema = z.object({
  title: z.string().min(1).describe('Short title'),
  status: TaskStatusSchema.default('pending').describe('Current status'),
  estimateHours: z
    .number()
    .optional()
    .describe('Estimated effort in hours')
    .meta({ unit: 'h', format: 'decimal' }),
})
```

**Closed vocabularies (enums, tool categories, filter buckets):** `const VALUES = [...] as const`, then a schema enum, attach descriptions for AI/UI, optional structured extras, infer the union type from the schema. **Do not** treat `export const LABELS = { id: 'Display Name' } as const` as the authority for the same strings unless it is derived from or validated by that schema.

```typescript
const TOOL_CATEGORY_VALUES = ['Metadata & Navigation', 'Strategic Objectives'] as const

export const ToolCategorySchema = z
  .enum(TOOL_CATEGORY_VALUES)
  .describe(
    'Used in toolDefinition metadata.category; groups tools and documents allowed values for the LLM.',
  )
  .meta({ title: 'Tool category' })

export type ToolCategory = z.infer<typeof ToolCategorySchema>
```

**Layer 3 — Router search (URL-shaped):** local `validateSearch` schemas; fields are usually optional for partial URLs.

```typescript
const TasksSearchSchema = z.object({
  status: z.enum(TASK_STATUSES).optional(),
  priority: z.enum(TASK_PRIORITIES).optional(),
  search: z.string().optional(),
})
export const Route = createFileRoute('/tasks/')({
  validateSearch: TasksSearchSchema,
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => getTasks({ data: deps }),
})
```

**Boundary mapping (mandatory):** layer switches happen only in mapper functions; **inbound** tool payloads become repo inputs with `RepoLayerSchema.parse(...)`, **outbound** repo documents become tools/API shapes with `ToolsLayerSchema.parse(...)`.

```typescript
// Inbound — tools-layer → repository-layer before calling the repo
function toRepoCreateInput(tool: z.infer<typeof TaskCreateToolSchema>): TaskRepoInput {
  return TaskRepoInputSchema.parse({
    title: tool.title,
    status: tool.status,
  })
}

// Outbound — repository row → tools-layer response for server fn + AI
function toToolTask(row: TaskRepo): z.infer<typeof TaskToolSchema> {
  return TaskToolSchema.parse({
    id: row.id,
    title: row.title,
    status: row.status,
  })
}
```

**TypeScript discipline (complements runtime validation):** the validator checks **at boundaries**; TypeScript keeps the interior honest — narrow with guards instead of casting.

```typescript
type TaskStatus = 'pending' | 'done'

const STATUS_LABEL = {
  pending: 'Pending',
  done: 'Done',
} as const satisfies Record<TaskStatus, string>

function assertNever(x: never): never {
  throw new Error(`Unexpected ${String(x)}`)
}

function labelForStatus(status: TaskStatus): string {
  switch (status) {
    case 'pending':
      return STATUS_LABEL.pending
    case 'done':
      return STATUS_LABEL.done
    default:
      return assertNever(status)
  }
}
```

**Virtual / computed fields:** If semantics cannot live in schema metadata, keep a small registry next to the derivation and expose `explainField` — do not duplicate fields already described by schemas.

## Request Context

### Context and philosophy — parse, don't validate

- **Validate at the edge:** use a runtime validator (Zod, ArkType, Valibot, …) in Start **middleware** when assembling request context — token/session parsing, `process.env` / `serverEnv`, external headers, repository enrichment.
- **TypeScript inside handlers:** once middleware calls `next({ context })`, Start **infers** `ctx.context` from the middleware chain on that server fn / route. Chain the middleware that provides the fields you need (e.g. `.middleware([webEnvMiddleware])` or `.middleware([requireAuthMiddleware])`).
- **Do not re-validate context in handlers:** no shallow "is this field present?" guards on middleware output. Parse at true **external** boundaries only; let middleware chaining carry types downstream. No `Register` / module-augmentation for middleware context.

Field names are app-specific (`accessTicket`, `identity`, `serverEnv`, …). This stock template middleware attaches auth (`user`, `userProfile`) plus startup-validated **`serverEnv`** and **`shellSession`** (see **`observability-and-env`** for how those are parsed and injected).

### Env and browser shell

**Invariant (Core Contract #17):** parse env once → inject `serverEnv` + `shellSession` via middleware → project **`shellSession`** to the browser only via `getBrowserShellSession` in the root loader.

**Do not duplicate the setup recipe here.** File layout, env schemas, `instrument.*.mts`, logger factories, and `webEnvMiddleware` wiring are in companion skill **`observability-and-env`**.

### Core rules for agents

1. **Direct context access** — read `ctx.context` fields directly (e.g. `context.user`, `context.serverEnv`, `context.shellSession`).
2. **No runtime context guards** — never add or call wrappers such as `getShellAuthContext(ctx.context)`, `getAccessTicket(ctx.context)`, or `accessTicketFrom(context)`. Middleware guarantees shape; missing fields are a middleware bug, not something handlers paper over.
3. **No type bypasses** — never cast context with `as unknown`, `as any`, or `context as SomeContext`. Chain middleware (e.g. `requireAuthMiddleware` after `authMiddleware`, or `webEnvMiddleware` for env fields) so `context` is inferred.
4. **Maintain boundary validation** — keep a runtime validator on **external** inputs: env, auth claims before enrichment, request bodies, third-party payloads, **browser session serialization**. Do not duplicate validation on context already built by trusted middleware.
5. **Env is a startup singleton** — parse with the chosen schema library once; put the result on context; do not call `process.env` or re-parse in handlers.

Enforce authorization in **server handlers** for every mutation and sensitive read. UI may hide controls; handlers are authoritative.

```typescript
export const updateTask = createServerFn({ method: 'POST' })
  .middleware([requireAuthMiddleware, invalidateMiddleware])
  .handler(async ({ data, context }) => {
    context.accessTicket.requireTaskEditor(data.taskId)
    const repoPatch = TaskRepoPatchSchema.parse(mapToolUpdateToRepo(data))
    return getWritableRepository().updateTask(data.taskId, repoPatch, {
      lastModifiedBy: context.identity.email,
    })
  })
```

Stock template equivalent — same rules; `requireAuthMiddleware` chains auth so `context.user` is inferred. Build a `TraceabilityContext` (do not pass a bare email string as the mutation’s second argument):

```typescript
.handler(async ({ data, context }) => {
  const repoPatch = TaskRepoPatchSchema.parse(mapToolUpdateToRepo(data))
  const trace = updateWriteTrace(context.user.email)
  return getWritableRepository().updateTask(data.taskId, repoPatch, trace)
})
```

### Security boundaries

- **Never leak `serverEnv` to the browser** — secrets and server-only config stay on the server; handlers must not return them from server functions or route loaders consumed by client bundles.
- **Browser-safe projections only** — client code receives **`shellSession`** via `getBrowserShellSession` + root loader (public env fields + `app`). Do not hand-pick fields from `serverEnv`.

## Interface Contracts

Repository interfaces reference **repository-layer types** only. **`WritableRepository`** mutations take an optional **`TraceabilityContext`** built from the auth ticket (stock template: helpers such as `createWriteTrace` / `updateWriteTrace` from `context.user.email`) — not ad-hoc optional email parameters at each call site.

Implementations must **persist** audit fields from the trace onto the entity (`createdBy` on create, `lastModifiedBy` on update). Ignoring the `trace` argument is a contract violation.

```typescript
interface TraceabilityContext {
  createdBy?: string
  lastModifiedBy?: string
}

interface ReadRepository {
  getTasks(filter?: TaskRepoFilter): Promise<TaskRepoOutput[]>
  getTask(id: string): Promise<TaskRepoOutput | null>
  getDistinctValues(field: string): Promise<string[]>
  getUserProfile(email: string): Promise<UserProfile | null>
}
interface WritableRepository {
  createTask(input: TaskRepoInput, trace?: TraceabilityContext): Promise<TaskRepoOutput>
  updateTask(
    id: string,
    input: Partial<TaskRepoInput>,
    trace?: TraceabilityContext,
  ): Promise<TaskRepoOutput | null>
  deleteTask(id: string): Promise<boolean>
}
```

## Implementation Flow

1. **Schemas:** repo + tools layers; mappers with `Schema.parse()`.
2. **Repository:** interfaces in `types.ts`; seed + production implementations.
3. **Server functions:** `serverFns.ts` — GET queries, POST mutations with shared validators.
4. **AI tools:** each server function → `toolDefinition` + `createSafeServerTool`; wire client tools in the chat shell (see AGENTS.md §8).
5. **Middleware:** `start.ts` — auth, invalidation, optional pre-auth `308` redirects for legacy paths.
6. **Routes:** `validateSearch`, `loaderDeps`, loaders; parent layouts for shared `beforeLoad`/data.
7. **Chat:** adapter, `chat()`, `buildSystemPrompt`, tool list — details in AGENTS.md §8.

## Special Patterns (use when the feature applies)

- **Overlay repository:** read-only upstream source + sparse user overrides; pure `applyOverrides`; writes only to overrides.
- **URL bulk edit:** selection and category tabs in search params; batched mutation; per-row auth.
- **Debounced free-text search (URL-as-state):** Keep filters in validated search params + `loaderDeps`, but do **not** control free-text search from the URL on every keystroke. Use an uncontrolled text input (`defaultValue` from the current search param) and a debounced callback — your UI library's debounce hook, `@tanstack/pacer`, or a small local helper — to `navigate({ replace: true, search })` only after the user pauses. Discrete filters (dropdowns, tabs, segmented controls) may navigate immediately. Call `navigate` from the debounce callback — do not watch a debounced value in `useEffect` just to navigate. **UI-agnostic:** this skill does not prescribe a component library; follow the project's UI kit in **AGENTS.md §3** for concrete input/select components.

  ```typescript
  const updateSearch = (updates: Partial<Search>, replace = false) => {
    navigate({
      to: '/tasks',
      replace,
      search: (prev) => ({ ...prev, ...updates }),
    })
  }

  const debouncedSearch = debounce((value: string) => {
    const next = value || undefined
    if (next === search.search) return
    updateSearch({ search: next }, true)
  }, 300)

// Render with your project's text input component (not prescribed here)
<input
  type="search"
  defaultValue={search.search ?? ''}
  onChange={(e) => debouncedSearch(e.currentTarget.value)}
/>
  ```

- **Help surface:** single `docs/help.md` can back `/help`, an AI tool, and suggested prompts (see AGENTS.md).
- **Distinct values:** `getDistinctValues` → GET server fn → read-only AI tool so filters match real data.
- **Dynamic AI navigation:** derive route/help context from `router.flatRoutes` + `validateSearch` introspection where possible.

## TanStack Intent, CLI, and AI

- **Intent:** `npx @tanstack/intent@latest list | load <pkg>#<skill> | stale` — pick version-matched package skills before deep TanStack work.
- **CLI (prefer current docs over memory):** `npx @tanstack/cli --help` → `libraries`, `search-docs "<query>" --library router|start|ai`, `doc <library> <path>`.
- **AI stack:** `@tanstack/ai`, `@tanstack/ai-react`, `/api/chat` — provider table, SSE wiring, system prompt sections, and chat endpoint anatomy are spelled out in **AGENTS.md §8**.

## Use the handbook (AGENTS.md)

| Need | Where |
|------|--------|
| UI kit and styling | §3 + **`reference-tech-stack`** |
| Auth, middleware, guards | §5 |
| AI adapters, chat client, tools, prompts, Markdown (GFM) rendering | §8 |
| Observability and env bridge | §9 + **`observability-and-env`** |
| Lint, unit/E2E test runners | §10–§11 + **`reference-tech-stack`** |
| Full validation checklist (format, lint, test, build) | §17 |
| Public runtime config (`shellSession`, not `window.__ENV__`) | §13 + **`observability-and-env`** |
| Opinionated package map for this template | **`reference-tech-stack`** |

## Verification

**This template repo (skill authors):** after editing YAML, run `pnpm skills:build` and `pnpm skills:check`.

**Apps built from the template:** follow **AGENTS.md** §17 — e.g. `pnpm format && pnpm lint && pnpm test && pnpm build`; smoke with dev server and `/api/health` when configuration allows.
