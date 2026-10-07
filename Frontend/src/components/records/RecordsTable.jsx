import RecordStatus, { getRecordStatus } from './RecordStatus.jsx'
import ClearanceBadge from './ClearanceBadge.jsx'
import { MessageId, Timestamp } from './RecordValues.jsx'

function AcknowledgementCount({ acknowledgements }) {
  const acknowledged = acknowledgements.filter(({ status }) => status === 'acknowledged').length
  return <span className="ack-count">{acknowledged} <span>/ 3</span></span>
}

export default function RecordsTable({ records, onViewRecord }) {
  return (
    <div className="records-table-scroll" role="region" aria-label="Broadcast history" tabIndex={0}>
      <table className="records-table">
        <thead>
          <tr>
            <th scope="col">Message</th>
            <th scope="col">Clearance</th>
            <th scope="col">Sent at</th>
            <th scope="col">Acknowledgements</th>
            <th scope="col"><span className="visually-hidden">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td className="records-empty" colSpan="5">No messages to display.</td>
            </tr>
          ) : records.map((record) => {
            const acknowledgements = record.acknowledgements ?? []
            return (
              <tr key={record.id}>
                <td className="record-message-cell">
                  <button className="message-preview" type="button" title={record.message} onClick={() => onViewRecord?.(record)}>
                    {record.message}
                  </button>
                  <MessageId value={record.id} />
                </td>
                <td><ClearanceBadge clearance={record.clearance} /></td>
                <td className="sent-at"><Timestamp value={record.sentAt} /></td>
                <td>
                  <div className="acknowledgement-cell">
                    <RecordStatus status={getRecordStatus(record)} />
                    <AcknowledgementCount acknowledgements={acknowledgements} />
                  </div>
                </td>
                <td className="record-action-cell">
                  <button className="view-record-button" type="button" onClick={() => onViewRecord?.(record)}>
                    View record <span aria-hidden="true">›</span>
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
