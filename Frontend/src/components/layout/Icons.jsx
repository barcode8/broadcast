export function SignalMark() {
  return (
    <span className="signal-mark" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  )
}

export function SendIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" fill="none">
      <path d="m17 3-6.7 14-2.2-5.1L3 9.7 17 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="m8.1 11.9 4.2-4.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function RecordsIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" fill="none">
      <path d="M7 5h9M7 10h9M7 15h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="3.5" cy="5" r=".8" fill="currentColor" />
      <circle cx="3.5" cy="10" r=".8" fill="currentColor" />
      <circle cx="3.5" cy="15" r=".8" fill="currentColor" />
    </svg>
  )
}

export function ChevronIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" fill="none">
      <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" fill="none">
      <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function ServerIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" fill="none">
      <rect x="3" y="3.5" width="14" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
      <rect x="3" y="11.5" width="14" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5.5 6h.1M5.5 14h.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
