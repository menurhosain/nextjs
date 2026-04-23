# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # start dev server
npm run build     # production build
npm run lint      # biome check (lint + format check)
npm run format    # biome format --write (auto-fix formatting)
```

No test runner is configured.

## Architecture

### Middleware (`src/proxy.ts`)

This file is the Next.js middleware, referenced by the build system as the middleware entry point despite not being named `middleware.ts`. It runs on every matched route and:

1. Redirects unauthenticated users to `/login`
2. Redirects authenticated users away from `/login` and `/register` to `/dashboard`
3. Enforces role-based route access — `APPLICANT_ONLY_ROUTES` blocks contractors, `CONTRACTOR_ONLY_ROUTES` blocks non-contractors
4. Injects the verified user object as the `x-user` request header for downstream server components

The `matcher` array in `config` must include any new protected route.

### Auth flow

- JWT is stored in an `httpOnly` cookie named `jwt`
- On each request, `verify_jwt` in `src/services/auth.service.ts` hits `GET /api/users/me` on the backend to validate and fetch the user
- The user object (including `type`: `"applicant"` | `"contractor"`) is forwarded via the `x-user` header and read in server components with `headers()` from `next/headers`

### User types

`src/lib/constant.ts` exports `APPLICANT = "applicant"` and `CONTRACTOR = "contractor"`. The `type` field on the user object drives all role-based UI and route access logic.

### Data flow pattern

Each feature follows this layered pattern:

```
Page (server component)
  └── Form (client component, "use client")
        └── Action (server action, "use server") in src/actions/
              └── Service in src/services/   ← raw fetch via api_client
```

`src/lib/api-client.ts` is the single fetch wrapper — it prepends `NEXT_PUBLIC_API_URL` and sets `Content-Type: application/json`.

### Navbar

`src/components/navbar.tsx` is a server component that reads `x-user` from headers to determine which links to show. Role-conditional links are computed inline before rendering. The profile avatar opens a client-side dropdown (`src/components/profile-menu.tsx`) that includes the logout action.

### Adding a new protected route

1. Create the page under `src/app/<route>/`
2. Add `"/<route>"` and `"/<route>/:path*"` to the `matcher` in `src/proxy.ts`
3. Add role restriction logic in `proxy.ts` if needed (`APPLICANT_ONLY_ROUTES` / `CONTRACTOR_ONLY_ROUTES`)
4. Add/filter the nav link in `src/components/navbar.tsx` based on `user?.type`
