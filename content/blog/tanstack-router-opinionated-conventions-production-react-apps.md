---
title: "TanStack Router: Opinionated Conventions for Production React Apps"
date: 2025-08-15
lang: en
keywords: TanStack Router, React, TypeScript, Vite, Vitest, Routing, Conventions
description: "A practical guide to building production-ready React applications with TanStack Router, featuring opinionated conventions for type-safe routing, data fetching, and state management. Learn how to leverage search params for shareable URLs, implement efficient loaders and mutations, and structure your codebase for maintainability. Based on real-world experience from MongoDB's Sales Apps Team."
toc: true
---

This post captures a practical way to implement a React application using TanStack Router. It focuses on maintainability, predictable data flows, and ergonomics for both reading and writing code.

> **Note:**  
> The conventions and recommendations in this guide are based on our real-world experience building a new internal application as the Sales Apps Team at [MongoDB](https://www.mongodb.com). They reflect lessons learned and best practices developed throughout that process.

## Chosen tech stack

### Typescript

Faster and safer development: Our goal was to catch bugs as early as possible—ideally at compile time, together with a next level developer experience. This approach not only reduces runtime errors but also makes refactoring and onboarding significantly easier.

> **Note:**  
> In my experience, well-documented project or team conventions have an even greater positive impact on onboarding than end-to-end typing alone.

We can see some examples of next level code assistance enabled by TypeScript in tools like [Arktype](https://arktype.io/), [TanStack Router](https://tanstack.com/router/latest), or [openapi-typescript](https://github.com/drwpow/openapi-typescript).

### E2E type safe: Arktype + TanStack router + openapi-fetch

Any input to our application will be validated and typed, there are different data inputs that can affect our application state:

- **Search params**: TanStack Router offers robust, type-safe search param validation out of the box. We use [Arktype](https://arktype.io/) for runtime validation, which integrates seamlessly with TanStack Router—see [this concise, powerful example](https://tanstack.com/router/latest/docs/framework/react/guide/search-params#arktype).

- **Backend**: In this case we generate a typed client from the backend [OpenAPI spec](https://swagger.io/docs/specification/v3_0/about/) with [`openapi-fetch`](https://github.com/openapi-ts/openapi-fetch). All backend interactions are handled exclusively through this generated client, ensuring type safety and consistency across the app.

> **Note:**  
> For teams seeking an extra layer of runtime validation, tools like [Arktype](https://arktype.io/) can be used to validate backend responses. However, in our experience—especially as maintainers of both the backend and frontend—this has proven unnecessary. With well-maintained OpenAPI specs, semantic versioning, and strong type generation, we've yet to encounter bugs caused by a mismatch between expected and actual responses. Unless your backend is managed by a separate team or you frequently encounter contract drift, runtime validation with Arktype is likely not needed in this case.

### Testing: Vitest + React testing library

Here the choices are quite obvious:

- [Vitest](https://vitest.dev/) because it is the go-to testing framework if you are using [Vite](https://vitejs.dev/).
- [Testing Library](https://testing-library.com/docs/) for intuitive, user-focused component tests.

## Project conventions

### Use search params to keep page state

Favor search params over component state for sharable, restorable URLs. This reduces ad‑hoc `useState` and makes the page state linkable.

This convention is one of the easiest and most impactful decisions we have made:

- Being able for our users to share exactly the same data via URLs was really important and we get this for free.
- If we want to change the page state, we just navigate to change search params:

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { type } from 'arktype'

const productSearchSchema = type({
    page: 'number = 1',
})

export const Route = createFileRoute('/shop/products/')({
    validateSearch: productSearchSchema,
    loaderDeps: ({ search: { page } }) => ({ page }),
    loader: ({ deps: { page } }) => fetchProducts({ page }),
})

function Products () {
    const navigate = Route.useNavigate()

    function handleChangePage(page: number) {
        // here we are just updating the query
        navigate({ search: (prev) => ({...prev, page})})
    }
}
```

When the navigation is performed, the loader will be called again to fetch the products in the new page. If the route was already loaded, then it will use the cached data.

Page state is fully type safe, always accessible, and can be as complex as needed. For example, this URL encodes all state to list products on page 2, 100 per page, sorted by ascending price, searching "water ski":  
`/shop/products?page=2&itemsPerPage=100&sort=asc&query=water ski&sortBy=price`  
Share this URL and everyone sees the exact same state.

If I want to change the state, will only have to navigate sort by date in descending order:

```diff
-`/shop/products?page=2&itemsPerPage=100&sort=asc&query=water ski&sortBy=price`  
+`/shop/products?page=2&itemsPerPage=100&sort=desc&query=water ski&sortBy=date`  
```

### Interacting with the backend

Keep backend calls thin and predictable. Recommended approach:

- Generate a typed client from your OpenAPI spec (e.g., with `openapi-fetch`).
- Wrap responses in a small helper that normalizes errors into a single `AppError` shape your UI can consume.

Example shape returned by `processResponse`:

```ts
type AppError = {
    title: string
    description?: string
}

type Processed<T> = { data?: T; error?: AppError }

async function getProduct(productId: string) {
    // response.data: only present if 2XX response
    // response.error: only present if 4XX or 5XX response
    const response = await client.GET("/products/{product_id}", {
        params: {
            path: { product_id: productId },
        },
    })

    // Here is where we try to convert the error into an AppError unified interface
    const { data, error } = processResponse({ response, action: `Fetching product ${productId}`})

    return {
        data,
        error
    }
}
```

### Data fetching - Loaders

**Leverage [route loaders](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#route-loaders) when possible** because they simplify data flows:

- Avoid most data contexts/hooks for reads; when the route renders, data is ready to pass down
- Built‑in caching based on declared [dependencies](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#dependency-based-stale-while-revalidate-caching).

#### Exceptions in loaders

Throw in loaders (e.g., `AppError`) so route error components handle failures consistently. Centralize error typing so UIs can show banners/toasts with `title` and `description`.

This is just convenient, because of [TanStack Error Components](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#handling-errors-with-routeoptionserrorcomponent).

Applying this pattern, fetching a product now throws on error for cleaner loader usage:

```ts

function getProduct(productId: string) {
    // ... same code as in the example above, the only change is below

    if (error) {
        throw error
    }
    return data
}
```

### Mutations

Mutation functions are similar to fetchers but generally **should NOT throw exceptions**. They’re invoked from event handlers, and **throwing loses error type information**. Return a `{ data, error }` object instead.

🚫 Ideally, we want to avoid having to inspect or discriminate error types at runtime:

```ts
try {
    throw new NotFoundError('Not Found', 404);
} catch (error: unknown) {
    if (error instanceof NotFoundError) {
        console.log('The object was not found', error.objectId);
    } else {
        console.log(`Caught something else: ${error}`);
    }
}
```

✅ Using the mutation in a route component:

```ts
async function handleDelete(productId: string) {
    const { data, error } = await deleteProduct(productId)
    if (error) {
        // The error has a title and description attributes
        pushToast({ variant: 'warning', ...error })
    } else {
        pushToast({
            variant: 'success',
            title: 'Deleted!',
            description: `Product ${productId}`
        })
        // Invalidate so the loader re-fetches the page state
        router.invalidate()
    }
}
```

### Styling

Use CSS Modules for simplicity. Create `Component.module.css` next to `Component.tsx`. Vite handles it out of the box, no extra config needed.

```tsx
// HomeLayout.tsx

import classes from './HomeLayout.module.css'

export default function HomeLayout() {
    return (
        <div className={classes.homeContainer}>
        <h2 className={classes.mainTitle}>Welcome!</h2>
        </div>
    )
}
```

### Leverage nested routing to show nested components

If a nested component isn’t rendered by default (e.g., a modal), make it a nested route instead of toggling hidden UI state.

Benefits:

- Clear separation of concerns; no need to render hidden components
- Nested routes can access parent loader data
- Lazy loading is straightforward
- Recoverable app state via URLs (e.g., `/products` vs `/products/new` for opening a modal)

#### Avoid calling a loader when the parent already loaded the data

In nested routes, reuse parent data:

```tsx
const { currentUser } = useLoaderData({ from: '__root__' })
```

### Leverage the default router cache

The built‑in cache works well by default. After a mutation followed by navigation, you may want to `router.invalidate()` to refetch fresh data.

#### Improve performance by setting only the needed loader deps

The dependencies are also part of the caching mechanism, and only the selected search params will re-fetch data.

```tsx
const productsIndexSchema = type({
    page: 'number = 1',
    sort: '"newest" | "oldest" | "price" = "newest"',
    condensedView: 'boolean = false',
})

// /routes/products.tsx
export const Route = createFileRoute('/products')({
    validateSearch: productsIndexSchema,
    loaderDeps: ({ search: { page, sort } }) => ({ page, sort }),
    loader: ({ deps: { page, sort } }) =>
        fetchProducts({
            page,
            sort,
        }),
})
```

In this example, updating the state to display a more condensed view does not trigger a data refetch, since `condensedView` is not included in the `loaderDeps`. This means the loader will not re-run when only the view mode changes, optimizing performance by avoiding unnecessary network requests.

```tsx
// This is not making the loader to re-fetch data, because condensedView is not defined in the loaderDeps
Route.navigate({ search: ({prev}) => ({...prev, condensedView: true})})
```

### Using router history

Use history navigation when it reflects user intent (e.g., closing a modal):

- Simpler than reconstructing `navigate` calls with params and search state
- Preserves cache/state more often; if you do need fresh data (e.g., post‑mutation), invalidate

### Project structure

- `src`
  - `assets`: public assets
  - `components`: React components; each usually has its own folder with styles and tests
  - `hooks`: custom React hooks
  - `routes`: TanStack Router routes (route tree definitions and pages)
  - `services`
    - `api`: wrappers around backend interactions; see fetch/mutation sections
    - `schemas`: `arktype` schema definitions
