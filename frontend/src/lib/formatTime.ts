/**
 * Formats an ISO-8601 timestamp into a short clock time (e.g. "10:30 AM").
 * The backend sends ISO strings; formatting is a view concern.
 */
export function formatClockTime(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
