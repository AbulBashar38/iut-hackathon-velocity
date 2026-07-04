/** Runtime configuration sourced from Vite env, with a deployed default. */
export const SOCKET_URL: string =
  import.meta.env.VITE_SOCKET_URL ?? 'http://147.93.107.185:6006'
