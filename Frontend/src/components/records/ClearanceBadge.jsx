export default function ClearanceBadge({ clearance }) {
  const normalized = String(clearance ?? '').toLowerCase()
  return <span className={`clearance-badge clearance-${normalized}`}>{clearance || '—'}</span>
}
