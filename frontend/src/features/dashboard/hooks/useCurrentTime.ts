import { useEffect, useState } from 'react'

/** Returns the current time, updating once per second. */
export function useCurrentTime(): Date {
  const [now, setNow] = useState<Date>(() => new Date())

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(intervalId)
  }, [])

  return now
}
