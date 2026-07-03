# IoT Office Monitoring — Frontend

The web dashboard for the **IoT Office Monitoring System**: a clean, real-time,
**read-only** monitoring UI for an office with 3 rooms and 15 devices
(2 fans + 3 lights per room). It renders the office layout, device states, live
power consumption, room-wise breakdowns, alerts, and charts — updating instantly
over Socket.io with no page refresh.

The frontend only *consumes* the backend's REST/WebSocket feed. It never controls
any device.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Running](#running)
- [Realtime Data Flow](#realtime-data-flow)
- [Routes](#routes)
- [Testing Guide](#testing-guide)
- [Design Notes](#design-notes)

---

## Tech Stack

| Concern          | Choice                          |
| ---------------- | ------------------------------- |
| Framework        | React 19                        |
| Build tool       | Vite                            |
| Language         | TypeScript (strict)             |
| Styling          | Tailwind CSS v4                 |
| UI components     | shadcn/ui (Radix-based)         |
| Routing          | React Router                    |
| Realtime         | socket.io-client                |
| Charts           | Recharts                        |
| Forms            | React Hook Form + Zod           |
| Icons            | lucide-react                    |

---

## Features

- **Auth pages** — login + sign up (React Hook Form + Zod validation, password
  strength meter, show/hide). Currently backed by a **mock** auth service.
- **Live dashboard**
  - Office layout: static floor-plan image with fan/light components overlaid via
    a percentage-based position config; fans spin + glow green when ON, lights
    glow amber when ON.
  - Statistics cards (total/active devices, active fans/lights, total power).
  - Device status list (all 15, with ON/OFF badges and last-changed time).
  - Live power panel (total + per-room bars).
  - Alerts panel (severity-colored, newest first).
  - Charts (power by room, device distribution, estimated usage).
  - Connection status indicator (Online/Offline) driven by the socket.

---

## Project Structure

```
src/
  main.tsx                     # app entry (Router mount)
  App.tsx                      # route tree host
  index.css                    # Tailwind v4 + theme tokens
  routes/AppRoutes.tsx         # /, /login, /signup
  components/ui/               # shadcn primitives (button, card, input, ...)
  lib/
    config.ts                  # SOCKET_URL from env
    formatTime.ts              # ISO → clock time (view formatting)
    utils.ts                   # cn() helper
  services/
    socket/
      socketClient.ts          # single typed socket instance
      socketEvents.ts          # server→client event contracts (mirror backend)
  features/
    realtime/
      RealtimeContext.tsx      # provider: owns the socket subscription
      useRealtime.ts           # hook: { status, devices, power, alerts }
    dashboard/
      pages/DashboardPage.tsx  # composes the live dashboard
      components/              # header, stat cards, panels, charts
      hooks/useCurrentTime.ts
      utils/dashboardStats.ts  # pure client-side derivations
      data/usage.mock.ts       # dummy series for the usage chart
    devices/                   # FanDevice, LightDevice, DeviceNode, status badge
    office-layout/             # OfficeLayout overlay
    alerts/                    # AlertsPanel
    auth/                      # login/signup pages, forms, hooks, schemas, mock service
  config/devicePositions.ts    # device coordinates (% of layout image)
  types/device.types.ts        # Device, Alert, RoomName, ...
```

---

## Prerequisites

- **Node.js 20+**
- **npm**
- The **backend** running (for live data) — see `../backend/README.md`. The UI
  loads without it but shows "Offline" and empty state.

---

## Setup

```bash
# from the repo root
cd frontend

# install dependencies
npm install

# (optional) point the socket at a non-default backend
echo "VITE_SOCKET_URL=http://localhost:6006" > .env.local
```

---

## Environment Variables

Vite exposes only variables prefixed with `VITE_` to the client. **Never put
secrets here** — anything prefixed `VITE_` is bundled into the public JS.

| Variable          | Default                 | Description                          |
| ----------------- | ----------------------- | ------------------------------------ |
| `VITE_SOCKET_URL` | `http://localhost:6006` | Backend Socket.io / API base URL     |

Put overrides in `.env.local` (gitignored).

---

## Running

```bash
npm run dev        # start Vite dev server (default http://localhost:5173)
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build locally
npm run lint       # ESLint
```

> The backend's `CLIENT_ORIGIN` defaults to `http://localhost:5173`, so the dev
> server works out of the box. If Vite picks a different port, update
> `CLIENT_ORIGIN` in the backend `.env` to match (CORS).

---

## Realtime Data Flow

```
socket.io-client ──connect──► backend
        │
   RealtimeProvider (subscribes once)
        │  devicesUpdated / powerUpdated / alertCreated
        ▼
   useRealtime() ──► DashboardPage ──► panels, layout, charts
```

- `RealtimeProvider` opens **one** shared socket, receives a snapshot on connect,
  then applies live updates. Alerts are prepended (capped in memory).
- Components read via `useRealtime()` — no polling, no manual fetches in the UI.
- Backend sends ISO timestamps; the view formats them with `formatClockTime`.

---

## Routes

| Path       | Page             | Notes                                  |
| ---------- | ---------------- | -------------------------------------- |
| `/`        | Dashboard        | Live monitoring view                   |
| `/login`   | Login            | Mock auth; navigates to `/` on success |
| `/signup`  | Sign up          | Mock auth                              |
| `*`        | Redirect         | Unknown paths → `/login`               |

Demo login (mock backend): `demo@acme.io` / `Password1`.

---

## Testing Guide

### 1. Static checks

```bash
npm run build   # runs tsc -b then vite build; must exit 0
npm run lint
```

### 2. Full-stack manual test

1. Start the backend: `cd ../backend && npm run dev` (port 6006).
2. Start the frontend: `npm run dev` and open the printed URL (e.g. `http://localhost:5173`).
3. On the dashboard, verify:
   - The header shows **Online** (green) — confirms the socket connected.
   - Device tiles on the office layout change ON/OFF every ~5s (fans spin, lights glow).
   - Stat cards, the power panel, and the "Power by Room" chart update live.
   - The device list reflects state and last-changed times.
   - Alerts appear in the Alerts panel when the backend raises them.

### 3. Graceful-degradation test

- Stop the backend while the dashboard is open → the header flips to **Offline**;
  the UI stays intact (no crash).
- Restart the backend → it reconnects and resumes updating.
- Load the frontend with the backend down → shows Offline + empty state.

### 4. Auth flow

- Visit `/login`, submit invalid input → inline Zod validation errors.
- Log in with the demo credentials → redirected to `/`.
- Visit `/signup` → password strength meter and confirm-password matching work.

---

## Design Notes

- **Feature-based architecture**: each feature owns its components, hooks, and
  logic; UI components stay small and presentational.
- **Context + hook for realtime** (instead of Redux) — right-sized for a single
  read-only feed, and swappable to a store later without touching components.
- **Device positions are config-driven** (`config/devicePositions.ts`, in % of the
  layout image) — never hardcoded in components, so they scale responsively and
  are easy to nudge.
- **Auth is currently mocked** (`features/auth/api/auth.api.ts`); swapping in the
  real backend means replacing that one service, not the UI.
- **Known dummy data**: the "Estimated Usage" chart uses a static sample series
  (`features/dashboard/data/usage.mock.ts`); everything else is live.
```
