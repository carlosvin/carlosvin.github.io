---
name: observability-and-env
description: 'Companion to tanstack-promptable-fullstack-app-template. Use when
  adding structured logging, centralized environment validation (runtime
  schemas), error-tracking bootstrap, or fixing env/shellSession leaks in a
  TanStack Start app. Teaches interface-first observability patterns: parse env
  once, inject via middleware, project a browser-safe shellSession, and keep
  process.env out of handlers. The reference app uses pino + Sentry behind
  ObservabilityService — swap vendors without changing middleware or handler
  contracts. Companion skills: tanstack-promptable-fullstack-app-template
  (parent), reference-tech-stack (companion). Install missing companions with
  npx skills add carlosvin/tanstack-fullstack-ai-template --skill <id>. Project:
  TanStack AI-Promptable Full-Stack Template. Triggers on "add logging", "set up
  logging", "structured logging", "pino logger", "sentry init", "error
  tracking", "opentelemetry", "instrument server", "instrument.server.mts",
  "instrument.server.mjs", "env schema", "environment validation", "centralize
  observability", "createModuleLogger", "createServerLogger", "webEnv",
  "webServerEnv", "shellSession", "getBrowserShellSession", "webEnvMiddleware",
  "LOG_LEVEL", "SENTRY_DSN", "serverEnv leak", "window.__ENV__", "process.env in
  handler", "process.env in application code".'
---

> This file is generated from `skills/src/*.skill.yaml`. Do not edit manually.

## Companion skills (install if missing)

This template publishes **multiple** skills. If only **this** skill is installed, add companions **before** related work:

- **`tanstack-promptable-fullstack-app-template`** (parent) — Architecture contract for this template — schema layers, server boundaries, AI tools, and middleware-inferred request context. Install for all non-observability TanStack work.
  ```bash
  npx skills add carlosvin/tanstack-fullstack-ai-template --skill tanstack-promptable-fullstack-app-template
  ```

- **`reference-tech-stack`** (companion) — Opinionated vendor map for this template's reference app. Install when matching the demo stack's concrete packages.
  ```bash
  npx skills add carlosvin/tanstack-fullstack-ai-template --skill reference-tech-stack
  ```

Discover all skills: `npx skills add carlosvin/tanstack-fullstack-ai-template --list`

# Observability and Environment Setup

**Purpose:** Establish **vendor-agnostic observability plumbing** — validated env
schemas, structured logging factories, and error-tracking bootstrap — following
patterns proven in production TanStack Start apps. Keeps `process.env` access
confined to env modules; application code receives typed, validated values as
arguments and calls an **`ObservabilityService` interface**, not a specific SDK.

> **Reference implementation (this template):** [pino](https://getpino.io/) for
> structured logs and [Sentry](https://sentry.io/) for error tracking, both
> behind `src/services/observability/`. Replace implementations without
> changing middleware contracts or handler call sites.
>
> **Parent skill:** `tanstack-promptable-fullstack-app-template` — architecture
> contract (schema layers, server boundaries, middleware-inferred context).
> Load **this skill additionally** when work touches logging, env schemas,
> error-tracking bootstrap, or `shellSession` / `getBrowserShellSession` plumbing.
>
> **Handbook:** [AGENTS.md §9](https://github.com/carlosvin/tanstack-fullstack-ai-template/blob/main/AGENTS.md) — file map and usage in this repo.

## Design principle — interface first

1. **Env** — parse once at startup; inject `serverEnv` + `shellSession` via middleware.
2. **Logging** — `createServerLogger('module')` in handlers; the factory binds validated env — swap pino for winston, consola, or OpenTelemetry log exporters behind the same API.
3. **Error tracking / tracing** — `getObservability().startSpan(...)` in handlers; bootstrap in `instrument.*.mts` before the app entry — swap Sentry for another vendor or OpenTelemetry without touching route handlers.
4. **Never** import vendor SDKs (`pino`, `@sentry/*`) directly in server function handlers or route loaders.

## Skill routing

| Task | Load |
|------|------|
| Logging, error tracking, `instrument.*.mts`, `src/env/`, env leaks, `shellSession` | **This skill** |
| Concrete package choices for this template (Zod, Mantine, pino, …) | **`reference-tech-stack`** |
| New routes, entities, AI tools, repository pattern, import protection | **`tanstack-promptable-fullstack-app-template`** |
| Server fn that logs and uses `context.serverEnv` | **This skill** + architecture |

## Key invariants (do not violate)

1. `process.env` is read **only** in `src/env/*.ts` (schema parse) and in a
   single `BootstrapEnvSchema.parse(process.env)` call inside
   `instrument.env.mts` (Sentry bootstrap — runs before the app entry).
   Parsed values are module singletons — **once per process at startup**.
2. Logger options (`logLevel`, `environment`) are **passed as arguments** to
   `createModuleLogger` — the factory never reads `process.env`.
3. **Typed server context** — middleware attaches `serverEnv` and `shellSession`
   via `next({ context })`. Chain that middleware on server fns that need those
   fields; Start infers `context.*` types from the chain.
4. **Browser shell session** — no `window.__ENV__`; root loader calls
   `getBrowserShellSession()` returning the allowlisted `shellSession`
   (public env fields + `app`). Never return `serverEnv` to the client.
   Do not import `webEnv` from client-shared route files.
5. The root pino logger is created **once** per process (lazy singleton); all
   module loggers are `child()` instances of it.

## File layout

```
src/env/
  runtimeEnvSchema.ts      # DeploymentEnv, LogLevel, shared preprocessors
  webEnv.ts                # webServerEnv + shellSession; parsed once

src/utils/
  logger.ts             # createModuleLogger(name, { environment, logLevel? })
  serverLogger.ts       # createServerLogger(name) — binds webServerEnv

src/middleware/
  webEnv.ts             # webEnvMiddleware: injects serverEnv, shellSession

instrument.env.shared.mts # shared DeploymentEnvSchema for bootstrap + TS callers
instrument.env.mts      # resolveSentryBootstrapEnv()
instrument.shared.mts   # initSentry({ dsn, environment, serverName, release })
instrument.server.mts   # bootstrap entry: resolve + init (dev); emitted .mjs in .output/server for prod
tsconfig.instrument.json
```

## src/env/runtimeEnvSchema.ts

Shared deployment enums and preprocessors used by web env (and any future pipeline env).
**Reference implementation uses Zod** — ArkType or Valibot work if you keep the same parse-once-at-startup contract.

```typescript
import { z } from 'zod'
import { DEPLOYMENT_ENV_VALUES, type DeploymentEnv, DeploymentEnvSchema } from '../../instrument.env.shared.mjs'

/** Empty / whitespace-only strings → undefined (Node process.env values are strings). */
export function envStringToUndefined(val: unknown): unknown {
  if (val === undefined || val === null) return undefined
  const s = String(val).trim()
  return s === '' ? undefined : s
}

export type { DeploymentEnv }
export { DEPLOYMENT_ENV_VALUES, DeploymentEnvSchema }

export const LOG_LEVEL_VALUES = ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'] as const
export const LogLevelSchema = z.enum(LOG_LEVEL_VALUES)
export type LogLevel = z.infer<typeof LogLevelSchema>

export const OptionalDeploymentEnvSchema = z.preprocess(envStringToUndefined, DeploymentEnvSchema.optional())
export const OptionalLogLevelSchema = z.preprocess(envStringToUndefined, LogLevelSchema.optional())
export const OptionalTrimmedStringSchema = z.preprocess(envStringToUndefined, z.string().optional())
```

## src/env/webEnv.ts

Parsed once when first imported. `ShellSessionSchema` is the browser-safe
projection (public env + app). `WebServerEnvSchema` adds secrets.

```typescript
import { z } from 'zod'
import pkg from '../../package.json' with { type: 'json' }
import { OptionalDeploymentEnvSchema, OptionalLogLevelSchema, OptionalTrimmedStringSchema } from './runtimeEnvSchema'

export const AppMetaSchema = z.object({
  name: z.string().min(1),
  version: z.string().min(1),
})

export const WebPublicEnvSchema = z.object({
  ENV: OptionalDeploymentEnvSchema,
  LOG_LEVEL: OptionalLogLevelSchema,
  SENTRY_DSN: OptionalTrimmedStringSchema,
})

export const ShellSessionSchema = WebPublicEnvSchema.extend({ app: AppMetaSchema })
export type ShellSession = z.infer<typeof ShellSessionSchema>

export const WebServerEnvSchema = WebPublicEnvSchema.extend({
  AUTH_HEADER_NAME: z.string().optional(),
  // ... secrets
})

export const webServerEnv = WebServerEnvSchema.parse(process.env)

export const shellSession = ShellSessionSchema.parse({
  ENV: webServerEnv.ENV,
  LOG_LEVEL: webServerEnv.LOG_LEVEL,
  SENTRY_DSN: webServerEnv.SENTRY_DSN,
  app: { name: pkg.name, version: pkg.version },
})
```

**Add required secrets** to `WebServerEnvSchema` only — they must never appear in `ShellSessionSchema`.

## src/utils/logger.ts

Structured logger factory. No `process.env` access — env values come from the caller.
**Reference implementation uses pino**; keep the same `createModuleLogger(name, options)` signature when swapping vendors.

```typescript
import pino, { type Logger } from 'pino'
import type { DeploymentEnv, LogLevel } from '../env/runtimeEnvSchema'

export type ModuleLoggerOptions = {
  environment: DeploymentEnv   // validated by caller's env schema
  logLevel?: LogLevel          // validated by caller's env schema
}

let rootLogger: Logger | null = null

function getRootLogger(environment: DeploymentEnv): Logger {
  if (rootLogger) return rootLogger
  // Server-only — not safe for client bundles.
  const isNodeTty = typeof process !== 'undefined' && process.stdout != null && Boolean(process.stdout.isTTY)
  const useTtyPretty = isNodeTty && environment !== 'production'
  // Root at 'trace' so child level overrides are never filtered out
  rootLogger = useTtyPretty
    ? pino({ level: 'trace' }, pino.transport({
        target: 'pino-pretty',
        options: { colorize: true, singleLine: true, translateTime: 'HH:MM:ss.l' },
      }))
    : pino({ level: 'trace' })
  return rootLogger
}

export function createModuleLogger(name: string, options: ModuleLoggerOptions): Logger {
  const { environment } = options
  return getRootLogger(environment).child({ name, environment }, { level: options.logLevel ?? 'info' })
}
```

## src/utils/serverLogger.ts

Thin bound factory for server-side modules — eliminates repeated
`{ environment: webServerEnv.ENV, logLevel: webServerEnv.LOG_LEVEL }` boilerplate.

```typescript
import { webServerEnv } from '../env/webEnv'
import { createModuleLogger } from './logger'

/** Server-side logger factory pre-bound to webServerEnv options. */
export const createServerLogger = (name: string) =>
  createModuleLogger(name, { environment: webServerEnv.ENV ?? 'development', logLevel: webServerEnv.LOG_LEVEL })
```

Usage in any server module:
```typescript
import { createServerLogger } from '../utils/serverLogger'
const log = createServerLogger('myServerFn')
```

## instrument.env.mts

TypeScript bootstrap module compiled to ESM for production. In dev, preload
`tsx` and import `instrument.server.mts` directly. Use `.mjs` extensions on
**relative imports between instrument files** so `moduleResolution: NodeNext`
maps to the emitted `.mjs` output. Bootstrap env stays validated in one place;
deployment enum is imported from `./instrument.env.shared.mjs` (source is
`.mts`). Keep strict: invalid `NODE_ENV` values fail at
`BootstrapEnvSchema.parse(process.env)`, and Sentry uses only `SENTRY_DSN`.

```typescript
import { z } from 'zod'
import { DeploymentEnvSchema } from './instrument.env.shared.mjs'

const BootstrapEnvSchema = z.object({
  NODE_ENV: DeploymentEnvSchema.optional(),
  SENTRY_DSN: z.string().optional(),
})

export function resolveSentryBootstrapEnv() {
  const env = BootstrapEnvSchema.parse(process.env)
  return {
    dsn: env.SENTRY_DSN,
    environment: env.NODE_ENV ?? 'development',
  }
}
```

## instrument.shared.mts

Receives all values pre-resolved — no `process.env` reads inside.
**Reference implementation uses `@sentry/tanstackstart-react`**; rename `initSentry` to match your vendor or wrap it inside `ObservabilityService`.

```typescript
import * as Sentry from '@sentry/tanstackstart-react'

export type InitSentryOptions = {
  serverName: string
  dsn: string | undefined
  environment: 'development' | 'staging' | 'production'
  release?: string
}

export function initSentry({ serverName, dsn, environment, release }: InitSentryOptions): void {
  if (!dsn) return
  Sentry.init({
    dsn,
    environment,
    serverName,
    ...(release ? { release } : {}),
    sendDefaultPii: true,
    tracesSampleRate: environment === 'production' ? 0.1 : 1.0,
  })
}
```

## instrument.server.mts (bootstrap entry)

```typescript
import { resolveSentryBootstrapEnv } from './instrument.env.mjs'
import { initSentry } from './instrument.shared.mjs'
import pkg from './package.json' with { type: 'json' }

const { dsn, environment } = resolveSentryBootstrapEnv()
initSentry({ serverName: 'my-app', release: pkg.version, dsn, environment })
```

**Dev** — preload `tsx` then this file, e.g. `NODE_OPTIONS='--import tsx --import ./instrument.server.mts'`.

**Production** — `tsc -p tsconfig.instrument.json` emits `.mjs` beside the Vite server bundle; copy `package.json` into `.output/server` so the import above resolves.

Update the `build` script:
```json
"build": "vite build && tsc -p tsconfig.instrument.json && cp package.json .output/server/package.json"
```

## webEnvMiddleware (typed context via chaining)

Injects startup-validated `serverEnv` and `shellSession`. Types come from
`next({ context })` + `.middleware([webEnvMiddleware])` on consumers.

```typescript
// src/middleware/webEnv.ts
import { createMiddleware } from '@tanstack/react-start'
import { shellSession, webServerEnv } from '../env/webEnv'
import { authMiddleware } from './auth'

export const webEnvMiddleware = createMiddleware()
  .middleware([authMiddleware])
  .server(({ next }) =>
    next({
      context: {
        serverEnv: webServerEnv,
        shellSession,
      },
    }),
  )
```

```typescript
// src/start.ts — sole global entry
export const startInstance = createStart(() => ({
  requestMiddleware: [webEnvMiddleware],
}))
```

Handlers that need env on `context` chain the middleware:

```typescript
export const getBrowserShellSession = createServerFn({ method: 'GET' })
  .middleware([webEnvMiddleware])
  .handler(async ({ context }) => context.shellSession)

export const getAIAvailability = createServerFn({ method: 'GET' })
  .middleware([webEnvMiddleware])
  .handler(async ({ context }) => ({
    available: Boolean(context.serverEnv.GEMINI_API_KEY),
  }))
```

Root loader:

```typescript
loader: async () => ({
  shellSession: await getBrowserShellSession(),
})
```

## Updating call sites

**observability/index.ts** — replace `process.env.SENTRY_DSN` with `shellSession`:

```typescript
import { shellSession } from '../../env/webEnv'

export function getObservability(options: GetObservabilityOptions): ObservabilityService {
  const dsn = options.shellSession?.SENTRY_DSN ?? shellSession.SENTRY_DSN
  // ...
}
```

**middleware/auth.ts** — replace `process.env.AUTH_HEADER_NAME` with
`webServerEnv`:

```typescript
import { webServerEnv } from '../env/webEnv'
const AUTH_HEADER_NAME = webServerEnv.AUTH_HEADER_NAME ?? 'Authorization'
```

## Checklist

- [ ] `process.env` appears only in `src/env/*.ts` and one bootstrap schema parse in `instrument.env.mts`
- [ ] `createModuleLogger` / `createServerLogger` never call `process.env`
- [ ] `instrument.server.mts` uses `resolveSentryBootstrapEnv()` + `initSentry()`, and `pnpm build` emits `.output/server/instrument.*.mjs`
- [ ] `package.json` is copied next to the emitted instrument bundle so version import works
- [ ] `shellSession` is parsed once in `webEnv.ts` (public env + app from package.json)
- [ ] Middleware injects `serverEnv` and `shellSession`; consumers chain middleware for inferred `context.*` types
- [ ] Browser config uses `getBrowserShellSession` from route loaders (not `window.__ENV__`, not raw `serverEnv`)
- [ ] `SENTRY_DSN` / `LOG_LEVEL` / `ENV` documented in `.env.example`
- [ ] Architecture invariants from parent skill still hold: never return `serverEnv` from handlers; chain `webEnvMiddleware` for typed `context.*`
