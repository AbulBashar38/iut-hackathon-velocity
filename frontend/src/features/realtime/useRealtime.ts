import { useContext } from 'react'

import {
  RealtimeContext,
  type RealtimeState,
} from '@/features/realtime/RealtimeContext'

/** Access the live device / power / alert feed. Must be used within RealtimeProvider. */
export function useRealtime(): RealtimeState {
  const context = useContext(RealtimeContext)
  if (!context) {
    throw new Error('useRealtime must be used within a RealtimeProvider')
  }
  return context
}
