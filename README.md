# Project Pay — Client

Web app for tracking project budgets, advances, and payments. Built for freelancers and agencies who need a clear view of what each client owes.

Pairs with the [ProjectPay Server](https://github.com/imSamiul/ProjectPay-Server) API.

## Features

| Role | What you get |
| --- | --- |
| **Client** | Home overview of linked projects and payment status |
| **Project manager** | Dashboard (Recharts), project list, create/edit projects, clients, payments |
| **Admin** | Platform dashboard, users, and all projects |

- Role-based sidebar and route guards
- URL-synced pagination and search where it matters
- Theme toggle, account settings, PDF-friendly payment views

## Stack

- React 18 + TypeScript + Vite
- TanStack Router (file-based) + TanStack Query
- Tailwind CSS v4 + shadcn/ui
- Axios, Recharts, Sonner

## Requirements

- Node.js 20+ recommended
- [pnpm](https://pnpm.io/) 9+
- Running ProjectPay API (default `http://localhost:4000`)

## Setup

```bash
pnpm install
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:4000
```

`VITE_API_URL` is the API **origin only**. The app calls `${VITE_API_URL}/api/v1/...`.

Start the UI:

```bash
pnpm dev
```

App: [http://localhost:5173](http://localhost:5173)

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Vite dev server (`--host`) |
| `pnpm build` | Typecheck + production build |
| `pnpm preview` | Serve the production build |
| `pnpm lint` | ESLint |

## Project structure

```
src/
  components/
    pages/          # Feature UI by domain (admin, projects, auth, …)
    layout/         # Sidebar, authenticated shell
    shared/         # Cross-feature pieces
    ui/             # Primitives (shadcn)
  routes/           # TanStack file routes
  services/         # API clients + mutations
  lib/              # Query keys, formatters, auth helpers
  hooks/
  types/
```

## Main routes

| Path | Who |
| --- | --- |
| `/login`, `/signUp` | Guests |
| `/` | Clients (managers/admins redirect away) |
| `/projectManager/dashboard` | Manager charts |
| `/projectManager/projects` | Manager project grid |
| `/projectManager/addProject`, `addClient` | Manager actions |
| `/project/$projectCode` | Project detail + payments |
| `/admin`, `/admin/users`, `/admin/projects` | Admin |
| `/account` | Any signed-in user |

## Development notes

1. Start the **server** before the client, or API calls will fail.
2. Sign up as `project manager` from the UI, or create an admin on the server with `pnpm run create-admin`.
3. Auth token is stored in a cookie; TanStack Query holds the current user.

## Related repos

- Backend: https://github.com/imSamiul/ProjectPay-Server
- This app: https://github.com/imSamiul/ProjectPay-Client
