# Tech Stack & Technical Standards

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- React Router
- Redux
- Socket.io Client
- Framer Motion
- Lottie React (only where appropriate)
- Recharts
- React Hook Form
- Zod

## State Management

Use Redux properly with **separate, focused stores** — never one giant store:

- Device Store
- Alert Store
- Socket Store
- UI Store

## API / Data Layer

Keep data access separate from UI. Layers:

- `api/`
- `socket/`
- `services/`

Never call `fetch` directly inside UI components.

## Styling

- Tailwind CSS only.
- No inline styles unless absolutely necessary.
- Extract reusable UI patterns.

## Performance

- Prevent unnecessary rerenders.
- Use memoization only where it provides measurable benefit.
- Avoid premature optimization.

## Accessibility

Interactive elements must:

- have keyboard support
- have proper aria labels
- use semantic HTML
