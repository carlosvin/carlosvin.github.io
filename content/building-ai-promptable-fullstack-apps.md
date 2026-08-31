---
title: "Building AI-Promptable Full-Stack Apps with TanStack Start"
slug: building-ai-promptable-fullstack-apps
description: "A reproducible full-stack architecture for AI-promptable web apps with TanStack Start, three-layer schemas, swappable interfaces, and Agent Skills."
date: 2026-03-08
updated: 2026-08-31
lang: en
toc: true
taxonomies:
  tags: ["ai", "react", "typescript", "tanstack-start", "tanstack-ai", "zod", "fullstack", "architecture", "mongodb", "mantine", "tanstack-router", "web-development", "playwright"]
---

Every time our team started a new full-stack React app, we faced the same problem: rebuild the same architecture from scratch. JWT authentication, database access, UI shell, TanStack AI integration, observability, and server boundaries — all the plumbing that has nothing to do with the actual business logic.

It started with internal tools at [MongoDB](https://www.mongodb.com), but the patterns apply to any full-stack web application — a customer-facing product, an admin dashboard, or a side project. After shipping several apps this way, we extracted the architecture into a [TanStack Start template](https://github.com/carlosvin/tanstack-fullstack-ai-template) that is **promptable by design**: the same server functions power the UI and AI tools, external services stay behind interfaces, and the entire contract is codified as **Agent Skills** so coding agents don't break invariants.

- [🔗 GitHub Repository](https://github.com/carlosvin/tanstack-fullstack-ai-template)
- [🚀 Live Demo](https://fullstack-promptable-app-example.netlify.app)

> **Note:**  
> The guidelines and architecture in this post are based on real-world experience building internal and customer-facing tools. They reflect lessons learned around schema boundaries, isomorphic execution, and agent tooling in production.

## The Problem

Most full-stack web applications share a remarkable amount of infrastructure:

- A database-backed API with CRUD operations and filtering
- Authentication and traceability from request headers
- An accessible component library with dark/light mode
- Safe server boundaries (preventing secret/driver leaks into client bundles)
- Error monitoring, structured logging, and performance tracing
- Increasingly, an AI assistant that can query data, navigate, and perform permitted mutations

Yet every project starts from `pnpm init` and rebuilds all of this. The code looks similar but is never quite the same, making it hard to maintain consistent patterns across a growing portfolio of applications.

## The Chosen Tech Stack

We chose [TanStack Start](https://tanstack.com/start) as the foundation — a full-stack React meta-framework that gives us:

- **Server functions** (`createServerFn`) that act as type-safe RPC endpoints
- **File-based routing** with [TanStack Router](https://tanstack.com/router) (see also our [production TanStack Router conventions](@/tanstack-router-opinionated-conventions-production-react-apps.md))
- **SSR** via Nitro, deployable anywhere (Netlify, Node, Docker)
- **Middleware pipeline** that runs on requests to build typed context (`next({ context })`)

For the UI, [Mantine](https://mantine.dev/) gives us 120+ accessible components, dark/light mode out of the box, responsive mobile-first props, and a theme system that keeps things consistent without writing custom CSS. For icons, we standardize on [`lucide-react`](https://lucide.dev/).

For AI, [TanStack AI](https://tanstack.com/ai) provides a unified interface across OpenAI, Anthropic, Gemini, and Netlify AI Gateway — with first-class support for tool calling, client-side tools, and streaming.

For quality and testing, [Biome](https://biomejs.dev/) handles fast linting and formatting, [Vitest](https://vitest.dev/) runs unit tests in jsdom, and [Playwright](https://playwright.dev/) executes end-to-end tests against in-memory seed data.

## Architecture: Everything Behind an Interface

The core principle is simple: **every external service is accessed through an interface**. This makes the database, auth, AI provider, and observability layer swappable without touching application code.

### The Repository Pattern

All data access goes through a `ReadRepository` + `WritableRepository` interface that speaks exclusively in repository-layer types:

```typescript
export interface ReadRepository {
  getTasks(filter?: TaskRepoFilter): Promise<TaskRepo[]>
  getTask(taskId: string): Promise<TaskRepo | null>
  getDistinctValues(field: DistinctValueField): Promise<string[]>
  getUserProfile(email: string): Promise<UserProfileRepo | null>
  getUserAccess(email: string): Promise<UserAccessRepo | null>
}

export interface WritableRepository {
  createTask(input: TaskRepoInput, trace?: TraceabilityContext): Promise<TaskRepo>
  updateTask(taskId: string, input: Partial<TaskRepoInput>, trace?: TraceabilityContext): Promise<TaskRepo | null>
  deleteTask(taskId: string): Promise<boolean>
}
```

Two implementations ship with the template:

1. **SeedRepository** — in-memory with sample data. Zero configuration, works instantly for local dev and CI.
2. **MongoRepository** — production MongoDB implementation.

A factory function auto-detects which to use based on whether `MONGODB_URI` is set (or explicit `REPOSITORY_TYPE`). For development, you never need a database running.

### Traceability on Writes

Notice the `TraceabilityContext` argument on `WritableRepository` methods:

```typescript
export interface TraceabilityContext {
  createdBy?: string
  lastModifiedBy?: string
}
```

Instead of passing ad-hoc email strings across handlers, write operations pass a structured traceability object built from the auth ticket (`createWriteTrace` on create, `updateWriteTrace` on update). Repositories persist these audit fields directly onto the entity (`createdBy` and `lastModifiedBy`), ensuring full auditability whether a mutation was triggered by the UI or by an AI tool call.

## The Three-Layer Schema Architecture

A common failure mode in full-stack TypeScript apps is type erasure or schema drift. We organize schemas into three distinct layers:

```
Route search schema (Layer 3: URL-shaped)
       ↓ (loaderDeps / loader)
Tools schema (Layer 2: API & AI-shaped, carries .describe())
       ↓ (createServerFn handler mapping via Schema.parse)
Repository schema (Layer 1: DB-shaped)
       ↓
Database / Repository Implementation
```

1. **Repository layer (`repository.ts`)**: Persisted DB document shapes. No `.describe()` needed here because these are internal.
2. **Tools / Server function layer (`schemas.ts`)**: API-shaped schemas shared between `createServerFn` (`.inputValidator(Schema)`) and AI `toolDefinition({ inputSchema })`. Every field has `.describe()` so the LLM receives rich JSON Schema metadata explaining what each parameter means.
3. **Router search layer**: Local `validateSearch` schemas in route files representing URL query parameters.

### Boundary Mapping

Layer switches happen strictly via mapper functions with `Schema.parse()` at each boundary:

```typescript
// Inbound: Tools layer → Repository layer
const repoFilter = filter ? TaskRepoFilterSchema.parse(filter) : undefined
const repoInput = TaskRepoInputSchema.parse(data)

// Outbound: Repository row → Tools layer (for UI loaders & AI tools)
export function toToolTask(row: TaskRepo): Task {
  return TaskSchema.parse(row)
}
```

After `Schema.parse()`, preserve inferred TypeScript types end-to-end — prefer `satisfies`, discriminated unions, narrow type guards, and exhaustive `switch` with `assertNever` over `any` or loose `as` type casts.

> **Why Zod?**  
> [ArkType](https://arktype.io/) is a great alternative and I personally like its syntax. We chose Zod for this template because of its broad ecosystem adoption and first-class tooling. Because the architecture is interface-first, you can swap to ArkType or Valibot by maintaining the same schema boundaries.

## Server Execution Boundaries & Isomorphic Loaders

TanStack Start route **loaders are isomorphic**: they run on the server during SSR **and** in the browser during client-side SPA navigations.

Treating route files as purely server-side code is a dangerous trap that can leak database drivers, secrets, or Node SDKs into client bundles.

### The Rules We Enforce

- **Route files are thin**: They only declare `createFileRoute`, `validateSearch`, `loaderDeps`, `loader`, and `component`.
- **No direct DB/repo imports in routes**: Loaders only call exported `createServerFn` endpoints from `src/services/api/serverFns.ts`.
- **`*.server.ts` naming convention**: Database clients (`mongoClient.server.ts`), repository loaders (`getRepository.server.ts`), and crypto utilities (`jwt.server.ts`) use the `.server.ts` suffix or start with `import '@tanstack/react-start/server-only'`.
- **`createServerOnlyFn` for internal singletons**: Internal factories that must **never** be client-callable (like DB connection getters) use `createServerOnlyFn` instead of `createServerFn`.
- **Vite import protection**: `vite.config.ts` configures `importProtection` with `behavior: 'error'` to immediately fail the build if server files or sensitive packages enter the client bundle:

```typescript
tanstackStart({
  importProtection: {
    behavior: 'error',
    client: {
      specifiers: ['mongodb', 'jose'],
      files: ['**/services/db/**', '**/repository/*.server.ts', '**/env/**'],
    },
  },
})
```

## Request Context & Middleware Pipeline

TanStack Start supports composable middleware where each middleware enriches context via `next({ context })`.

### Auth via Typed Access Ticket

The auth middleware (`src/middleware/auth.ts`) reads the JWT from the configured `AUTH_HEADER_NAME` (default: `Authorization`), extracts identity claims, loads the user's profile and roles from the repository, and constructs an **`AccessTicket`**:

```typescript
export const authMiddleware = createMiddleware().server(async ({ next, request }) => {
  const authHeader = request.headers.get(AUTH_HEADER_NAME)
  const identity = extractIdentityFromJwt(authHeader)

  let profile = null
  let roles: string[] = []

  if (identity.email) {
    const [userProfile, userAccess] = await Promise.all([
      getReadRepository().getUserProfile(identity.email),
      getReadRepository().getUserAccess(identity.email),
    ])
    profile = userProfile
    roles = userAccess?.roles ?? []
  }

  const accessTicket = createAccessTicket({ identity, profile, roles })
  return next({ context: { accessTicket } })
})
```

The `AccessTicket` encapsulates user identity, roles, and authorization helpers (`requireTaskCreator`, `requireRole`).

### Middleware Chaining

We chain middleware to infer typed context on server functions:

```typescript
// Queries: GET server functions (unauthenticated by default)
export const getTasks = createServerFn({ method: 'GET' })
  .inputValidator(TaskFilterSchema.optional())
  .handler(async ({ data: filter }) => {
    const repoFilter = filter ? TaskRepoFilterSchema.parse(filter) : undefined
    const rows = await getObservability({}).startSpan('getTasks', () => 
      getReadRepository().getTasks(repoFilter)
    )
    return rows.map(toToolTask)
  })

// Mutations: POST server functions chain requireAuthMiddleware and invalidateMiddleware
export const updateTask = createServerFn({ method: 'POST' })
  .middleware([requireAuthMiddleware, invalidateMiddleware])
  .inputValidator(UpdateTaskInputSchema)
  .handler(async ({ data, context }) => {
    const task = await getReadRepository().getTask(data.taskId)
    if (!task) throw new HttpError(404, 'Task not found')
    
    // Server-enforced authorization guard
    context.accessTicket.requireTaskCreator(task)
    
    const repoUpdates = TaskRepoInputSchema.partial().parse(data.updates)
    const trace = updateWriteTrace(context.accessTicket.identity.email)
    const row = await getObservability({}).startSpan('updateTask', () =>
      getWritableRepository().updateTask(data.taskId, repoUpdates, trace)
    )
    return row ? toToolTask(row) : null
  })
```

Key aspects of this pipeline:
- **`requireAuthMiddleware`**: Enforces that `context.accessTicket` is authenticated for mutations; throws 401 if anonymous.
- **`invalidateMiddleware`**: Instructs the client router to automatically call `router.invalidate()` after a successful POST mutation. Components never trigger manual invalidations.
- **No manual context casts**: TypeScript automatically infers `context.accessTicket` from the middleware chain.

## Centralized Observability & Env Validation

Instead of scattering `process.env` calls across the codebase, we parse environment variables **once at startup** into a validated schema:

```
process.env → webServerEnv (server-only secrets + configs)
            → shellSession (browser-safe projection: public env + app version)
```

1. **`src/env/webEnv.server.ts`**: Parses and validates `WebServerEnvSchema` lazily on first access.
2. **`src/middleware/webEnv.ts`**: Injects `serverEnv` and `shellSession` into request context.
3. **`getBrowserShellSession`**: A GET server function called by the root route loader (`__root.tsx`) to project safe app metadata and public config to the browser without exposing secrets or `window.__ENV__`.
4. **Structured logging**: `createServerLogger('moduleName')` binds the validated log level and environment to [Pino](https://getpino.io/) loggers without reading `process.env` inside utility functions.
5. **Error tracking**: Sentry is bootstrapped before application startup via `instrument.server.mts`. If `SENTRY_DSN` is not provided, a no-op implementation is used.

## Promptable by Design: AI Tools on the Same Server Functions

This is the pattern we are most excited about. TanStack AI tools call the **same server functions** that route loaders and UI event handlers use:

```typescript
// src/services/ai/tools.ts
const getTasksToolDef = toolDefinition({
  name: 'getTasks',
  description: 'Get all tasks with optional filters. Supports status, priority, assignee, and search.',
  inputSchema: TaskFilterSchema,
})

export const getTasksTool = createSafeServerTool(getTasksToolDef, async (args) =>
  getTasks({ data: TaskFilterSchema.parse(args) })
)
```

### Safe Tool Handlers

Instead of letting thrown `HttpError`s crash the agent loop, `createSafeServerTool` wraps execution with `safeToolHandler()`. When an unauthorized mutation is attempted, it catches the 401/403/404 `HttpError` and returns a structured `{ error, code }` response.

The AI assistant can then explain the failure politely:
- *401*: "You need to log in to create tasks."
- *403*: "Only the task creator can edit or delete this task."

### Full Tool Coverage & Client Tools

The AI assistant is equipped with:
- **Server tools**: `getTasks`, `getTask`, `getDistinctValues` (discovers real filter values like active assignees), `getUserProfile`, `getUserAccess`, `getAppRuntimeInfo`, `getCurrentUserContext`, `createTask`, `updateTask`, `deleteTask`.
- **Client tools**: Executed directly in the browser via `@tanstack/ai-client`:
  - **`navigate`**: Calls `router.navigate()` with validated routes and search params.
  - **`invalidateRouter`**: Calls `router.invalidate()` so the UI immediately refreshes after AI mutations.

### Dynamic AI Context & Navigation Manifest

The chat endpoint (`POST /api/chat`) streams SSE responses using TanStack AI's `chat()`. The client attaches a `BrowserContext` (timezone, locale, current path, query string, full URL).

The server injects this into the system prompt alongside a navigation manifest derived from the router (`buildAppNavigation(router)`). This lets the AI resolve relative references: when a user on `/tasks/task-123` says *"Summarize this task and mark it done"*, the assistant extracts `$taskId` from the current location context and acts on it immediately.

```typescript
const stream = chat({
  adapter,
  messages: convertMessagesToModelMessages(body.messages ?? []),
  systemPrompts: [systemPrompt],
  tools,
  agentLoopStrategy: maxIterations(10), // Bounded agent loop
})
```

All `chat()` invocations set an explicit `agentLoopStrategy: maxIterations(10)` to prevent runaway tool loops.

## URL-as-State & Router Conventions

We follow opinionated router conventions:

- **URL-as-State**: Filters, pagination, and search queries live in URL search params validated with `validateSearch`. They are shareable, bookmarkable, and survive refresh.
- **`loaderDeps` for caching**: Specify exact dependencies (`loaderDeps: ({ search }) => search`) so loaders only re-fetch when relevant search keys change.
- **Debounced free-text search**: To avoid re-running loaders on every keystroke, free-text inputs use uncontrolled inputs (`defaultValue` from URL) and a debounced navigate callback. Discrete filters (dropdowns, segmented tabs) navigate immediately.
- **Search-preserving `Link` component**: We ship a project-local `Link` wrapper with `search: true` as the default so current query parameters are preserved when navigating between tabs and pages.
- **Parent layout loaders**: Shared beforeLoad guards and expensive profile reads belong on the parent layout (`__root.tsx`); child routes consume them via `useLoaderData` rather than repeating calls.

## Distributing Best Practices via Agent Skills

Architecture documentation in a wiki or README often goes unread. When developers work with AI coding agents (Cursor, Claude Code, Windsurf), agents can easily introduce anti-patterns unless given explicit guidelines.

We packaged the entire architectural contract into **Agent Skills** published directly from the repository:

```bash
# Discover all available skills in this template repository
npx skills add carlosvin/tanstack-fullstack-ai-template --list

# Install the core architecture skill
npx skills add carlosvin/tanstack-fullstack-ai-template --skill tanstack-promptable-fullstack-app-template

# Install companion skills
npx skills add carlosvin/tanstack-fullstack-ai-template --skill observability-and-env
npx skills add carlosvin/tanstack-fullstack-ai-template --skill reference-tech-stack
```

### The Three Published Skills

1. **`tanstack-promptable-fullstack-app-template`** (Core Architecture): Vendor-agnostic contract enforcing three-layer schemas, isomorphic loader safety, server boundaries, AI tool parity, URL-as-state, and middleware request context.
2. **`observability-and-env`**: Invariants for single-parse startup env, `webServerEnv` vs `shellSession`, Pino logging factories, and Sentry bootstrap.
3. **`reference-tech-stack`**: Concrete package defaults for this reference implementation (Zod, Mantine, MongoDB, jose, Biome, Vitest, Playwright, Netlify).

Whenever an AI agent generates new entities, server functions, or routes in projects using this skill, it adheres to these invariants automatically.

## Getting Started

You can spin up the full template locally in seconds:

```bash
git clone https://github.com/carlosvin/tanstack-fullstack-ai-template.git my-app
cd my-app
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The app starts with in-memory seed data — a complete task management application with a responsive dashboard, filtered lists, detail views, task CRUD, and the AI chat drawer. No database, no API keys, and no environment variables required.

### Testing and Validation

Run the complete validation suite:

```bash
pnpm format    # Auto-format with Biome
pnpm lint      # Lint and typecheck with Biome + tsc
pnpm test      # Run unit tests with Vitest
pnpm test:e2e  # Run Playwright E2E tests against seed data
pnpm build     # Verify production SSR build
```

When you are ready to connect production services, configure the environment variables in `.env`:

| Variable | Purpose |
| -------- | ------- |
| `MONGODB_URI` | Connect a real MongoDB database (swaps from seed repository automatically) |
| `GEMINI_API_KEY` or `OPENAI_API_KEY` | Enable the AI chat assistant (or deploy to Netlify for AI Gateway) |
| `SENTRY_DSN` | Enable error and performance tracking |
| `AUTH_HEADER_NAME` | Custom HTTP header for incoming JWTs (default: `Authorization`) |

## Extending the Template

Adding a new domain entity is a repeatable six-step workflow:

1. **Schemas**: Add repository-layer schemas in `repository.ts` and tools-layer schemas with `.describe()` in `schemas.ts`. Create bidirectional mappers with `Schema.parse()`.
2. **Repository**: Declare methods on `ReadRepository` and `WritableRepository` (accepting `TraceabilityContext`). Implement in `seedRepository.ts` and `mongoRepository.server.ts`.
3. **Server Functions**: Create GET queries and POST mutations (with `requireAuthMiddleware` and `invalidateMiddleware`) in `serverFns.ts`.
4. **AI Tools**: Expose the server functions as AI tools in `tools.ts` via `createSafeServerTool()`. Add distinct-value discovery tools if applicable.
5. **Routes & UI**: Add file-based routes in `src/routes/` with `validateSearch`, `loaderDeps`, and component UI.
6. **Tests**: Add unit tests for repository mappers and E2E specs in `e2e/` using seed data.

## Conclusion

The goal of this template is not to create another rigid framework — it is to provide a **production-ready starting point** for full-stack, AI-promptable applications.

By combining:
- Type-safe server functions and isomorphic loaders
- Three-layer schema validation with Zod
- Repository and service interfaces for complete swappability
- AI tools sharing the exact same code paths and authorization as the UI
- Codified Agent Skills for reliable AI-assisted engineering

You get a solid, maintainable foundation that saves weeks of repetitive scaffolding on every new project.

- 📁 [GitHub Repository](https://github.com/carlosvin/tanstack-fullstack-ai-template)
- 🚀 [Live Demo](https://fullstack-promptable-app-example.netlify.app)

---

*Built with TanStack Start, Mantine, TanStack AI, MongoDB, Zod, Sentry, Vitest, Playwright, and Biome.*
