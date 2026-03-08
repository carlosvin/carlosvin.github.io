---
title: Building AI-Promptable Full-Stack Apps: A Reproducible Architecture
slug: building-ai-promptable-fullstack-apps
description: How we extracted a reproducible full-stack architecture for AI-promptable internal tools with TanStack Start, interfaces for every external service, and Zod schemas as single source of truth.
date: 2026-03-08
---

Every time our team started a new internal tool, we faced the same problem: rebuild the same architecture from scratch. Authentication, database access, UI shell, AI integration — all the plumbing that has nothing to do with the actual business logic.

After building several applications this way, we extracted the common patterns into a template. This post explains the architecture and the reasoning behind each decision.

> **[Live demo](https://leafy-manatee-16b96c.netlify.app)** | **[Source code](https://github.com/carlosvin/tanstack-fullstack-ai-template)**

## The Problem

Internal tools share a remarkable amount of infrastructure:

- A database-backed API with CRUD operations
- Authentication from a JWT in request headers
- A component library with dark/light mode
- Error monitoring and performance tracing
- Increasingly, an AI assistant that can query the data

Yet every project starts from `npm init` and rebuilds all of this. The code looks similar but is never quite the same, making it hard to maintain patterns across a growing portfolio of tools.

## The Stack

We chose [TanStack Start](https://tanstack.com/start) as the foundation — a full-stack React meta-framework that gives us:

- **Server functions** (`createServerFn`) that act as type-safe RPC endpoints
- **File-based routing** with TanStack Router
- **SSR** via Nitro, deployable anywhere
- **Middleware** that runs on every request, perfect for auth

For the UI, [Mantine](https://mantine.dev/) gives us 120+ production-ready components, dark/light mode out of the box, and a theme system that keeps things consistent without writing custom CSS.

For AI, [TanStack AI](https://tanstack.com/ai) provides a unified interface across OpenAI, Anthropic, Gemini, and more — with first-class support for tool calling and streaming.

## Architecture: Everything Behind an Interface

The core principle is simple: **every external service is accessed through an interface**. This makes each piece swappable without touching application code.

### The Repository Pattern

All data access goes through a `ReadRepository` + `WritableRepository` interface:

```typescript
export interface ReadRepository {
  getTasks(filter?: TaskFilter): Promise<Task[]>
  getTask(taskId: string): Promise<Task | null>
  getAssignees(): Promise<string[]>
}

export interface WritableRepository {
  createTask(input: TaskInput, createdBy?: string): Promise<Task>
  updateTask(taskId: string, input: Partial<TaskInput>): Promise<Task | null>
  deleteTask(taskId: string): Promise<boolean>
}
```

Two implementations ship with the template:

1. **SeedRepository** — in-memory with sample data. Zero configuration, works instantly.
2. **MongoRepository** — production MongoDB implementation.

A factory function auto-detects which to use based on whether `MONGODB_URI` is set. For development, you never need a database.

### Auth via Global Middleware

TanStack Start supports [global middleware](https://tanstack.com/start/latest/docs/framework/react/guide/middleware) — functions that run on every request before any handler executes.

We use this for authentication: the middleware reads the JWT from the configured header, decodes the identity, and when the user is authenticated it loads their profile from the repository. Both are attached to the request context:

```typescript
// src/middleware/auth.ts
export const authMiddleware = createMiddleware().server(async ({ next, request }) => {
  const authHeader = request.headers.get(AUTH_HEADER_NAME)
  const identity = extractIdentityFromJwt(authHeader)
  const user = identity.email ? identity : ANONYMOUS_USER

  let userProfile = null
  if (user.email) {
    userProfile = await getReadRepository().getUserProfile(user.email)
  }

  return next({ context: { user, userProfile } })
})
```

Registered globally in `src/start.ts`:

```typescript
export const startInstance = createStart(() => ({
  requestMiddleware: [authMiddleware],
}))
```

Every server function automatically receives `context.user` and `context.userProfile` — no manual header extraction. For mutations, we chain a function-level **requireAuthMiddleware** (`src/middleware/requireAuth.ts`) so only POST server functions require authentication; read-only queries stay unauthenticated. The handler can then assume `context.user` is defined. For other cases, use the composable guards `requireAuth(context)` and `requireGroup(context, group)` from `src/utils/auth.ts`; they throw with 401/403 so your handler code stays minimal.

### Promptable by Design

This is the pattern we are most excited about. AI tools call the **same server functions** that route loaders and event handlers use — a single code path for validation, auth, observability, and data access. Tool handlers are wrapped with `withErrorHandling()` so that failures return `{ error: string, code?: number }` instead of crashing the agent loop:

```typescript
const getTasksToolDef = toolDefinition({
  name: 'getTasks',
  description: 'Get all tasks with optional filters...',
  inputSchema: TaskFilterSchema,  // Zod schema with .describe()
})

export const getTasksTool = getTasksToolDef.server((args) =>
  withErrorHandling(() => getTasks({ data: TaskFilterSchema.parse(args) }))
)
```

Because we use Zod schemas with `.describe()` on every field, the AI model receives rich JSON Schema metadata explaining what each parameter means. The model can then compose tool calls to answer complex queries.

We also expose **create**, **update**, and **delete** as AI tools. Since these call the same server functions used by the UI — which already have `requireAuthMiddleware` chained in — auth and creator checks happen automatically. A **getCurrentUserContext** tool lets the AI check who is logged in and what they can do. When the user is not allowed, mutation server functions throw with 401 or 403, `withErrorHandling()` catches this and returns `{ error, code }`, and the AI explains it in plain language: “You need to log in to create tasks” or “Only the task creator can edit that task.”

The template also uses [TanStack AI client tools](https://tanstack.com/ai/latest/docs/guides/client-tools) — tools that execute in the browser instead of on the server. **navigate** triggers `router.navigate()` to open a page, and **invalidateRouter** calls `router.invalidate()` so the UI refreshes after AI-driven mutations. Their definitions live in `tools.ts` (shared with the server), but the implementations run in the chat drawer component via `@tanstack/ai-client`.

A chat drawer talks to the backend via `POST /api/chat` with Server-Sent Events (SSE) streaming. The client sends browser context plus current location (`currentPathname`, `currentSearch`, `currentHref`), and the server injects this into the system prompt as `Current Location` context.

We also keep a navigation manifest in sync with the route tree (`src/services/ai/navigationManifest.ts`) so the model understands URL structure, including dynamic routes like `/tasks/$taskId` (concrete URLs: `/tasks/<taskId>`). This lets the assistant interpret references such as "this page" and "this task" using the route the user is currently viewing.

Users get a natural language interface to their data — and to create, edit, and delete tasks when permitted — with permission-aware error handling.

### Observability as a Plugin

Monitoring is important but vendor lock-in is not. We define a minimal interface:

```typescript
export interface ObservabilityService {
  startSpan<T>(name: string, fn: () => Promise<T>): Promise<T>
  setUser(user: { email: string; name: string }): void
  captureError(error: unknown): void
}
```

Sentry is the default implementation. If `VITE_SENTRY_DSN` is not set, a no-op implementation is used — the app works perfectly fine without any observability configured. To switch to Datadog, New Relic, or anything else, implement the three methods.

### Data Flow and Conventions

A few conventions keep the app predictable. **Loaders-first**: all data is fetched in route loaders, not in `useEffect` + `useState`; loaders give you caching, SSR, and parallel fetching for free. **URL-as-state**: filters, tabs, and modal open/close live in URL search params so state is shareable, bookmarkable, and survives refresh. **Mutations**: POST server functions chain `invalidateMiddleware`, so after a mutation the client automatically calls `router.invalidate()` and refetches; components never invalidate manually. Mutation server functions **throw** on error; route callers wrap with `processResponse()` for a `{ data, error }` result, so the UI can show toasts or inline errors without try/catch in every handler. **E2E tested**: Playwright tests run the full app against the seed repository, covering routes, filters, CRUD, and auth gating — no database needed.

## Zod Schemas as the Single Source of Truth

Every domain type starts as a Zod schema:

```typescript
export const TaskSchema = TaskInputSchema.extend({
  id: z.string().describe('Unique identifier for the task'),
  createdAt: z.string().describe('ISO 8601 timestamp when created'),
  updatedAt: z.string().describe('ISO 8601 timestamp when last updated'),
})

export type Task = z.infer<typeof TaskSchema>
```

This single definition serves four purposes:

1. **TypeScript types** — inferred via `z.infer<>`
2. **Server function validation** — passed to `.inputValidator(Schema)`
3. **AI tool schemas** — converted to JSON Schema automatically
4. **Documentation** — `.describe()` metadata is embedded everywhere

No more maintaining separate interfaces, validation logic, and documentation that inevitably drift apart.

**Why Zod?** [ArkType](https://arktype.io/) is a very good alternative and I personally prefer its syntax; we went with Zod here because it is more widely known. Zod v4 also lets you add extra metadata on fields—formatting hints, units, etc.—which is useful for formatting in the UI and for giving better hints to the AI when it uses your schemas.

### Project structure

The important pieces live under `src/`: `middleware/` (auth, invalidation), `services/schemas/` (Zod as single source of truth), `services/repository/` (interface plus seed and Mongo implementations), `services/api/` (server functions), `services/ai/` (adapter and tool definitions), and `routes/` (file-based pages). The repo README has the full tree.

## Getting Started in 30 Seconds

```bash
git clone https://github.com/carlosvin/tanstack-fullstack-ai-template.git
cd tanstack-fullstack-ai-template
pnpm install
pnpm dev
```

You can also try the [live demo](https://leafy-manatee-16b96c.netlify.app) without cloning.

For a new project you can run `rm -rf .git && git init` after cloning to start fresh history. Use `pnpm build`, `pnpm test`, and `pnpm lint` (and `pnpm format`) to validate your fork. To run in production via Docker: `docker build -t my-app .` then `docker run --rm -p 3000:3000 my-app`.

The app starts with seed data — a working task management system with dashboard, list views, detail pages, dark/light mode, and an AI chat drawer. No database, no API keys, no environment variables needed.

When you're ready to add real backends, set the relevant variables. The repo includes an `.env.example` with full documentation; the main ones are:

| Variable | Purpose |
| -------- | ------ |
| `MONGODB_URI` | Use a real database instead of in-memory seed data |
| `AZURE_OPENAI_API_KEY`, `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT` | Enable the AI chat assistant (OpenAI-compatible) |
| `VITE_SENTRY_DSN` | Enable error and performance monitoring |
| `AUTH_HEADER_NAME` | HTTP header for the JWT (default: `Authorization`) |

Each capability layers on independently. You can clone and replace the Task domain with your own, use the generated Cursor/Windsurf skill for AI-assisted setup, or adopt layers incrementally; the repo README has the details.

## Extending the Template

Adding a new domain entity is a six-step process:

1. **Zod schema** in `schemas.ts` with `.describe()` annotations
2. **Repository methods** in the interface, then implement in seed and MongoDB
3. **Server functions** wrapping the repository (GET for loaders, POST with `invalidateMiddleware` for mutations)
4. **AI tools** that call the server functions (wrapped with `withErrorHandling()`), plus a **getCurrentUserContext** tool so the AI knows who is logged in and what they can do
5. **Routes** for the UI pages
6. **Tests** for the seed repository, new utilities, and E2E flows (Playwright runs against seed data)

Because every layer follows the same pattern, adding a new entity takes minutes, not hours. The database, AI provider, and observability layer are behind interfaces; to swap one, implement the interface and update the factory (e.g. `getRepository.ts` for the repository, the AI adapter factory, or the observability factory in the repo).

## Conclusion

The goal is not a framework — it's a **starting point**. Fork the template, replace the Task domain with your own, and you have a production-ready full-stack application with:

- Type-safe server functions
- JWT authentication via middleware (mutations use requireAuthMiddleware)
- AI-powered data querying and task create/edit/delete with permission-aware errors (401/403)
- Dark/light mode UI
- Swappable database, AI provider, and observability
- E2E tests via Playwright against seed data (no database needed)
- Docker-ready deployment

All with zero configuration for local development.

The template is open source at [github.com/carlosvin/tanstack-fullstack-ai-template](https://github.com/carlosvin/tanstack-fullstack-ai-template). You can try the [live demo](https://leafy-manatee-16b96c.netlify.app) to see it in action before cloning. We hope it saves you the same weeks of scaffolding it saved us.

---

*Built with TanStack Start, Mantine, TanStack AI, MongoDB, Zod, Sentry, Vitest, Playwright, and Biome.*
