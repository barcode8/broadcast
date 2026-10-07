import { getRecordStatus } from './RecordStatus.jsx'

const summaryItems = [
  { status: 'acknowledged', label: 'Fully acknowledged' },
  { status: 'pending', label: 'Awaiting response' },
  { status: 'failed', label: 'With failures' },
]

export default function RecordSummary({ records }) {
  const totals = records.reduce((counts, record) => {
    counts[getRecordStatus(record)] += 1
    return counts
  }, { acknowledged: 0, pending: 0, failed: 0 })

  return (
    <section className="record-summary" aria-label="Message status summary" aria-live="polite">
      {summaryItems.map(({ status, label }) => (
        <div className={`record-summary-item summary-${status}`} key={status}>
          <span className="record-summary-dot" aria-hidden="true" />
          <span className="record-summary-count">{totals[status]}</span>
          <span className="record-summary-label">{label}</span>
        </div>
      ))}
    </section>
  )
}
