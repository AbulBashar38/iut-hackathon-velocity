import { io, type Socket } from 'socket.io-client'

import { SOCKET_URL } from '@/lib/config'
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@/services/socket/socketEvents'

export type MonitoringSocket = Socket<
  ServerToClientEvents,
  ClientToServerEvents
>

let socket: MonitoringSocket | null = null

/**
 * Lazily creates a single shared socket instance. `autoConnect` is off so the
 * realtime provider controls the connection lifecycle explicitly.
 */
export function getSocket(): MonitoringSocket {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      transports: ['websocket'],
    })
  }
  return socket
}
