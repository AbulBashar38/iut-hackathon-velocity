# Project Structure & Clean Code Rules

## Architecture

Use **Feature-Based Architecture**. Prioritize clean architecture over short code.
Never generate quick prototype code unless explicitly requested.

## Folder Structure

```
src
  app
  assets
  components
  features
    office-layout
    devices
    alerts
    dashboard
    power
  hooks
  layouts
  lib
  services
  store
  types
  utils
  config
  routes
```

## Component Principles

- Every component has a single responsibility.
- Components stay small — keep them under roughly 200 lines.
- Avoid giant JSX files.
- Prefer composition over condition-heavy rendering.
- Separate business logic from presentation.

## Clean Code Rules

Always:

- Use TypeScript properly — avoid `any`.
- Prefer interfaces.
- Use reusable components.
- Use reusable hooks.
- Use reusable utility functions.
- Use descriptive naming.
- Avoid duplicated logic.
- Prefer composition.
