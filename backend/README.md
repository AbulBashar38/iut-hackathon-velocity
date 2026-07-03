# IoT Office Monitoring — Backend

Backend for the **IoT Office Monitoring System**. There are no real IoT
devices: this service **simulates** an office full of devices and streams
their state to the dashboard in real time over **Socket.io**, while also
exposing a small **REST** surface for initial loads.

The office has **3 rooms** (Drawing Room, Work Room 1, Work Room 2), each with
**2 fans + 3 lights** — **15 devices total**. The dashboard is read-only; the
backend only publishes state, it never takes device commands.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Language:** TypeScript (strict, ES Modules)
- **Real-time:** Socket.io
- **Validation:** Zod
- **Dev runner:** tsx

No database. Device, power, and alert data are held in memory and regenerated
by the simulation engine, so the service is stateless and easy to run.

## Status

Actively being refactored from a copied issue-tracker backend into this
architecture. Current state: clean, runnable Express baseline (health check +
config + error handling). The simulation engine, Socket.io layer, and
`device` / `power` / `alert` modules are being added module by module.

## Project Structure

```
src/
  app.ts                     # Express app: middleware, routes, error handling
  server.ts                  # HTTP server + Socket.io + starts the simulation
  config/index.ts            # Validated environment configuration
  core/
    errors/AppError.ts       # Operational error type
    middleware/               # globalErrorHandler, notFound
    utils/                    # sendResponse, catchAsync, logger
    validation/               # validateRequest (Zod)
  socket/                    # Socket.io server init, event names, emitters
  simulation/                # In-memory device store, simulator engine, alert rules
  types/domain.ts            # Device, Room, DeviceType, Alert, ...
  modules/
    device/                  # Device read model (controller/service/route/types)
    power/                   # Power totals + per-room
    alert/                   # Alerts read model
  routes/index.ts            # Mounts all module routes under /api
```

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

3. **Run in development (hot reload)**
   ```bash
   npm run dev
   ```

The server starts on `http://localhost:6006` by default.

## Environment Variables

| Variable        | Default                 | Description                                   |
| --------------- | ----------------------- | --------------------------------------------- |
| `NODE_ENV`      | `development`           | Runtime environment                           |
| `PORT`          | `6006`                  | Port for the HTTP + Socket.io server          |
| `CLIENT_ORIGIN` | `http://localhost:5173` | Allowed origin for CORS and Socket.io (the UI)|

## Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Run with hot reload (`tsx watch`)    |
| `npm run build`     | Compile TypeScript to `dist/`        |
| `npm start`         | Run the compiled build               |
| `npm run typecheck` | Type-check without emitting          |

## REST API (planned surface)

Base path: `/api`. All responses use a consistent envelope
(`{ success, message, data }`).

| Method | Endpoint             | Description                          |
| ------ | -------------------- | ------------------------------------ |
| GET    | `/`                  | Health check                         |
| GET    | `/api/devices`       | All devices with current state       |
| GET    | `/api/devices/:id`   | A single device                      |
| GET    | `/api/power/summary` | Total power + active-device counts   |
| GET    | `/api/power/by-room` | Power consumption per room           |
| GET    | `/api/alerts`        | Current alerts                       |

## Realtime Events (planned surface)

The server pushes updates over Socket.io so the dashboard never polls:

| Event             | Payload            | Description                        |
| ----------------- | ------------------ | ---------------------------------- |
| `device:updated`  | `Device`           | A device changed state/power       |
| `alert:created`   | `Alert`            | A new alert was raised             |
| `connection:status` | `{ online: boolean }` | Simulated connection heartbeat |

## Architecture Notes

- **Feature-based modules.** Each module owns its `route` → `controller` →
  `service` chain; controllers stay thin, business logic lives in services.
- **Single source of truth.** The in-memory device store is the only place
  device state lives; REST read models and Socket.io emitters both read from it.
- **Simulation-driven.** A simulator mutates device state on an interval and
  publishes changes, mimicking a live IoT feed. Swapping in real hardware later
  means replacing the simulation layer, not the API.
