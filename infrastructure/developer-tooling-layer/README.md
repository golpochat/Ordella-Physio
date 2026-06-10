# Developer Tooling Layer

Unified development standards, automation, linting, formatting, commit enforcement, testing scaffolds, and CI/CD templates for the **ordella-physio** monorepo.

## Quick start

```bash
cd infrastructure/developer-tooling-layer
bash scripts/bootstrap.sh
```

Bootstrap will:

1. Install workspace + tooling dependencies
2. Install Husky hooks (`pre-commit`, `commit-msg`)
3. Copy GitHub Actions workflows to `.github/workflows/`
4. Install root `.editorconfig` if missing
5. Scaffold missing `.env` files from `.env.example`

## Folder layout

```
developer-tooling-layer/
  eslint/           # Base, backend, frontend, shared ESLint presets
  prettier/         # Prettier + Tailwind plugin
  commitlint/       # Conventional Commits enforcement
  husky/            # Git hooks (copied to repo root by bootstrap)
  lint-staged/      # Staged-file lint + format
  jest/             # Backend + frontend Jest presets
  vitest/           # Optional Vitest preset
  playwright/       # E2E tests (Chromium, Firefox, WebKit)
  github/workflows/ # CI/CD workflow templates
  turbo/            # Turbo task pipeline template
  scripts/          # bootstrap, verify, lint, format, test, generate-env
```

## Linting

### Run lint across the monorepo

```bash
# From repo root
pnpm lint

# Or via tooling script
bash infrastructure/developer-tooling-layer/scripts/lint-all.sh
```

### ESLint presets

| Preset | Use for | Path |
|--------|---------|------|
| Base | Shared TypeScript rules | `eslint/base.eslintrc.js` |
| Backend | NestJS microservices | `eslint/backend.eslintrc.js` |
| Frontend | Next.js / React apps | `eslint/frontend.eslintrc.js` |
| Shared | `packages/*` libraries | `eslint/shared.eslintrc.js` |

Copy a template from `eslint/templates/` into a workspace package:

```js
// services/auth-service/.eslintrc.cjs
const path = require("node:path");

module.exports = {
  root: true,
  extends: [
    path.join(__dirname, "../../infrastructure/developer-tooling-layer/eslint/backend.eslintrc.js"),
  ],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
};
```

**Enabled rules (highlights):**

- `@typescript-eslint/no-floating-promises` (requires `parserOptions.project`)
- `@typescript-eslint/no-explicit-any` (warn)
- `simple-import-sort` import/export ordering
- `unused-imports` automatic unused import removal
- NestJS plugin (backend)
- React + React Hooks (frontend)

## Formatting

Prettier config: `prettier/prettier.config.js`

| Option | Value |
|--------|-------|
| Indent | 2 spaces |
| Semicolons | `false` |
| Quotes | double |
| Trailing commas | `all` |
| Tailwind plugin | enabled |

```bash
bash infrastructure/developer-tooling-layer/scripts/format-all.sh
```

## Git hooks (Husky)

| Hook | Action |
|------|--------|
| `pre-commit` | `lint-staged` (ESLint --fix + Prettier) |
| `commit-msg` | `commitlint` conventional commit validation |

## Commit conventions (Commitlint)

Allowed types:

- `feat` — new feature
- `fix` — bug fix
- `chore` — maintenance
- `refactor` — code refactor
- `docs` — documentation
- `test` — tests
- `ci` — CI/CD changes
- `perf` — performance

Example:

```
feat(auth): add refresh token rotation scaffold
```

## Testing

### Jest

Presets in `jest/`:

| Preset | Environment | Use for |
|--------|-------------|---------|
| `jest.backend.config.js` | Node + ts-jest | NestJS services |
| `jest.frontend.config.js` | jsdom + RTL | Next.js / React apps |

Reference from a service `package.json`:

```json
{
  "jest": {
    "preset": "../../infrastructure/developer-tooling-layer/jest/jest.backend.config.js",
    "rootDir": "."
  }
}
```

Global setup: `jest/jest.setup.ts` (jest-dom, correlation ID placeholder).

### Vitest (optional)

Extend `vitest/vitest.config.ts` from packages that prefer Vitest (e.g. `@ordella/ui`).

### Playwright E2E

```bash
cd infrastructure/developer-tooling-layer
pnpm install
pnpm test:e2e
```

| Setting | Default |
|---------|---------|
| Base URL | `http://localhost:3010` (`PLAYWRIGHT_BASE_URL`) |
| Browsers | Chromium, Firefox, WebKit |
| Auth helper | `playwright/helpers/auth.ts` (placeholder) |

```bash
# Interactive UI mode
pnpm test:e2e:ui
```

## Verification (lint + typecheck + test)

```bash
bash infrastructure/developer-tooling-layer/scripts/verify.sh
```

## CI/CD

Workflow templates live in `github/workflows/`. Bootstrap copies them to `.github/workflows/`.

| Workflow | Purpose |
|----------|---------|
| `ci.yml` | Install, lint, typecheck, test, build + Turbo cache |
| `pr-checks.yml` | PR lint/test + GitHub step summary placeholder |
| `build.yml` | Matrix build for microservices + frontend + Docker placeholder |
| `test.yml` | Jest (Turbo) + Playwright with artifact upload |

### Docker build placeholder

`build.yml` includes a `docker-build-push` job scaffold. Wire `docker/build-push-action` when images are ready for CI.

### Turbo

Template pipeline: `turbo/turbo.json`. Merge tasks into the repo root `turbo.json` as needed.

## Environment generation

```bash
bash infrastructure/developer-tooling-layer/scripts/generate-env.sh
```

Creates `.env` from `.env.example` for services, apps, and infrastructure folders when missing.

## Adding new tooling

1. Add config under the appropriate subfolder (`eslint/`, `jest/`, etc.)
2. Document usage in this README
3. Update `scripts/bootstrap.sh` if repo-root wiring is required
4. Add a workflow step in `github/workflows/` if CI should run it
5. Add a Turbo task in `turbo/turbo.json` if it should run across packages

## Integration with existing `@ordella/config-eslint`

The monorepo already ships `@ordella/config-eslint` in `packages/config/eslint`. This tooling layer provides **extended** presets (import sorting, NestJS/React plugins, Husky, CI). Migrate services incrementally by replacing:

```js
extends: ["@ordella/config-eslint"]
```

with the backend/frontend/shared presets from this layer.

## Environment variables

See `.env.example` for Playwright, CI, and tooling path settings.
