# Product Context

## What We're Building

The frontend for an **IoT Office Monitoring System** (hackathon project). It is a
**real-time, READ-ONLY monitoring dashboard** for an office.

The frontend only consumes backend APIs and websocket events. It **never controls
any device**. Its sole responsibility is visualization and monitoring.

## Domain Model

The office contains three rooms:

- Drawing Room
- Work Room 1
- Work Room 2

Each room contains:

- 2 Fans
- 3 Lights

**Total devices = 15.**

There are NO real IoT devices. The backend simulates IoT devices and pushes
real-time updates over Socket.io.

## Dashboard Responsibilities

The dashboard displays:

- Office layout
- Device states
- Live power consumption
- Room-wise power consumption
- Alerts
- Device list
- Connection status
- Real-time updates (no page refresh)

## Office Layout Rules

- The office layout is a **static background image** — do NOT draw the office dynamically.
- Use one background layout image, overlay React components using absolute positioning.
- Every Fan and Light is its own reusable React component.
- Device positions must be configurable from a separate configuration file.
- Never hardcode pixel values inside components.

Structure example:

```
OfficeLayout
  Background
  Fan
  Fan
  Light
  Light
```

## Device Visualization

**Fan**
- ON: rotate continuously, smooth animation
- OFF: stop rotating, slightly reduced opacity

**Light**
- ON: bright yellow, glow effect, soft shadow, optional pulse
- OFF: dim, no glow

Animations should be lightweight. Prefer CSS or Framer Motion. Use Lottie only if
it provides a meaningful improvement.

## Real-Time Updates

Backend sends websocket events, e.g.:

- Device Updated
- Alert Created
- Connection Status

The UI must update immediately without a page refresh.

## Animation Feel

Animations should feel like a monitoring dashboard: smooth, professional, minimal.
Avoid flashy animations.

## Error Handling

Handle gracefully:

- Socket disconnected
- API failure
- Loading state
- Empty state
- Reconnect state
