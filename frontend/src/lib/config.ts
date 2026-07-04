/** Runtime configuration sourced from Vite env, with a deployed default. */
export const SOCKET_URL: string =
  import.meta.env.VITE_SOCKET_URL ?? 'https://api.shifuit.com/'
