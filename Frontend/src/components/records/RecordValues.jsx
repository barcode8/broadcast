export function formatTimestamp(value, timeOnly = false) {
  if (!value) return '—'
  const parsed = new Date(typeof value === 'string' ? value.replace(' · ', ' ') : value)
  if (!Number.isFinite(parsed.getTime())) return String(value)
  const options = timeOnly
    ? { hour: '2-digit', minute: '2-digit', second: '2-digit' }
    : { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }
  return new Intl.DateTimeFormat('en-US', options).format(parsed)
}

export function Timestamp({ value, timeOnly = false, className = '' }) {
  const parsed = value ? new Date(typeof value === 'string' ? value.replace(' · ', ' ') : value) : null
  const dateTime = parsed && Number.isFinite(parsed.getTime()) ? parsed.toISOString() : undefined
  return <time className={className} dateTime={dateTime}>{formatTimestamp(value, timeOnly)}</time>
}

export function MessageId({ value, className = '' }) {
  return <span className={`message-id ${className}`.trim()}>{value || '—'}</span>
}
