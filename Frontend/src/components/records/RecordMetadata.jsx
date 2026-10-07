import ClearanceBadge from './ClearanceBadge.jsx'
import { MessageId, Timestamp } from './RecordValues.jsx'

export default function RecordMetadata({ record }) {
  return (
    <dl className="record-metadata">
      <div>
        <dt>Message ID</dt>
        <dd><MessageId value={record.id} className="metadata-monospace" /></dd>
      </div>
      <div>
        <dt>Clearance</dt>
        <dd><ClearanceBadge clearance={record.clearance} /></dd>
      </div>
      <div>
        <dt>Sent at</dt>
        <dd><Timestamp value={record.sentAt} className="metadata-monospace" /></dd>
      </div>
    </dl>
  )
}
