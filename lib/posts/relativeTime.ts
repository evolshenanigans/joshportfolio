export function relativeTime(iso: string, now: Date = new Date()): string {
  // Day boundary is computed in UTC (deliberate: keeps output deterministic across timezones)
  const then = new Date(iso + "T00:00:00Z")
  const days = Math.floor((now.getTime() - then.getTime()) / 86_400_000)
  if (days <= 0) return "now"
  if (days < 7) return `${days}d`
  if (days < 30) return `${Math.floor(days / 7)}w`
  if (days < 365) return `${Math.floor(days / 30)}mo`
  return `${Math.floor(days / 365)}y`
}
