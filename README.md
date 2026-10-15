# Progress UI

Progress UI is a Next.js frontend organized around user-facing features. This
keeps related screens, components, API calls, and types together so the app can
be extended one working feature at a time.

## Run locally

```bash
pnpm install
pnpm dev
```

Set `NEXT_PUBLIC_API_URL` to the Progress API base URL before starting the
frontend. Use `pnpm run lint`, `pnpm exec tsc --noEmit`, and `pnpm run build` to
check changes.

## Source structure

```text
app/                         Next.js routes and route-level metadata
features/
  auth/                      Sign-in, sign-up, and verification
  accounts/                  Connected-account display and management
  home/                      Dashboard header, account menu, and search
  landing/                    Public landing-page sections
  progress/
    projects/                Project screens, API, hook, server, and types
    tasks/                   Task screens, API, utilities, and types
  users/                     User profile, settings, and search
  legal/                     Privacy policy and terms content
  documentation/             User guide content and page components
shared/
  components/
    layout/                  App-wide page layouts
    ui/                      Reusable, domain-independent UI
  lib/                       Shared infrastructure, such as the API client
```

The user-facing application guide is available at `/documentation`. It
describes current features, workflows, access behavior, and known limitations.

### Ownership rules

- Keep `app/` route files thin: read route parameters, load route-level data,
  set metadata, and compose feature UI. Put feature behavior in `features/`.
- Keep a feature's components, API functions, types, hooks, server helpers, and
  utilities within that feature. Keep project-specific and task-specific code
  within their corresponding progress subfeature.
- Put something in `shared/` only when it is reusable across unrelated
  features. Shared UI should not own feature-specific API or business rules.
- Import across feature boundaries through explicit paths. Avoid creating
  barrel files that hide module ownership or introduce broad imports.
- Keep types near the feature that owns the data. Reuse or depend on another
  feature's public types only when the domain relationship is real.

## Delivering features incrementally

Use Agile iterations to deliver small, usable vertical slices, rather than
creating folders for sprints. For each story, agree on observable acceptance
criteria, implement the route/UI and its API or data behavior together, verify
loading/empty/error/success states, and review the slice before moving on.
Prefer small changes that leave the application buildable at each step.

Before merging a slice, run the relevant checks:

```bash
pnpm run lint
pnpm exec tsc --noEmit
pnpm run build
```
