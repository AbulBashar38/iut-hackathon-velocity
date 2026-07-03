/** Runtime configuration sourced from Vite env, with sensible dev defaults. */
export const SOCKET_URL: string =
  import.meta.env.VITE_SOCKET_URL ?? 'http://localhost:6006'
