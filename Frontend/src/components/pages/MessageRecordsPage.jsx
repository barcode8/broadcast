import { useMemo } from 'react'
import RecordSummary from '../records/RecordSummary.jsx'
import RecordsTable from '../records/RecordsTable.jsx'

export default function MessageRecordsPage({ records = [], onViewRecord }) {
  const newestFirst = useMemo(() => records.slice().sort((first, second) => {
    const parseTimestamp = (value) => new Date(typeof value === 'string' ? value.replace(' · ', ' ') : value).getTime()
    const firstTime = parseTimestamp(first.sentAt)
    const secondTime = parseTimestamp(second.sentAt)
    if (!Number.isFinite(firstTime) || !Number.isFinite(secondTime)) return 0
    return secondTime - firstTime
  }), [records])

  return (
    <div className="records-page">
      <div className="records-page-heading">
        <div>
          <p className="eyebrow">Broadcast operations</p>
          <h1 className="page-title">Message records</h1>
          <p className="page-description">Review broadcasts and acknowledgement state across all consumers.</p>
        </div>
        <div className="record-total" aria-live="polite">
          <span className="record-total-number">{newestFirst.length}</span>
          <span className="record-total-label">{newestFirst.length === 1 ? 'message' : 'messages'}</span>
        </div>
      </div>

      <RecordSummary records={newestFirst} />

      <section className="broadcast-history" aria-labelledby="broadcast-history-title">
        <div className="broadcast-history-heading">
          <div>
            <h2 id="broadcast-history-title">Broadcast history</h2>
            <p>Most recent messages appear first.</p>
          </div>
        </div>
        <RecordsTable records={newestFirst} onViewRecord={onViewRecord} />
      </section>
    </div>
  )
}
