# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` — runs `node --watch app.ts`. There is no build/compile step: Node executes the TypeScript source directly (see `tsconfig.json`: `noEmit`, `erasableSyntaxOnly`, `rewriteRelativeImportExtensions`), and `--watch` restarts the server on file changes.
- `npm test` — not configured; the script is a placeholder that exits with an error. There is no test suite in this repo yet.
- No lint/format tooling (no ESLint/Prettier config) is set up in this project.

## Architecture

This is a minimal Express (v5) backend, run directly as TypeScript via Node's native TS support (note the `nodenext`/`verbatimModuleSyntax`/relative-import-extension setup in `tsconfig.json` — imports must use explicit `.ts` extensions, which Node/TS rewrites for you).

- `app.ts` — entry point. Creates the `Express` app, mounts routers/middleware, and starts listening on port 8080.
- `src/*.ts` — one Express `Router` per resource, mounted onto `app` in `app.ts` (e.g. `src/units.ts` is mounted at `/units`). New resources follow this pattern: create a router in `src/`, import and `app.use('/path', router)` in `app.ts`.
- `types/express.d.ts` — augments the global Express `Request` interface (e.g. `req.requestTime`). Add new custom `Request`/`Response` fields here rather than casting.
- `public/` — static assets served under `/static` via `express.static`.
- `data/mech-data.json` — unit data read from disk per-request with `fs.readFileSync` (no database). `public/unit-data.json` is a separate, differently-populated unit dataset used for the static frontend — the two are not currently kept in sync, so check which one a given route/page is actually reading before assuming they match.

### Middleware/route ordering matters

Express matches routes and runs middleware in registration order, and this codebase relies on that:
- In `app.ts`, middleware and routers are registered in a specific sequence (`/static`, `/units`, then `requestTime`, then the error handler, then `/`). Middleware registered after a route does not run for that route, and an error-handling middleware only catches errors from handlers registered *before* it — so placement changes behavior, not just readability.
- Within a router, a param route like `/:unit` will swallow any static route (e.g. `/about`) registered after it. Static/specific routes must be declared before param routes on the same router.
