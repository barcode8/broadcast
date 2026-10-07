const statusLabels = {
  acknowledged: 'Acknowledged',
  pending: 'Pending',
  failed: 'Failed',
  unavailable: 'Unavailable',
}

export function getRecordStatus(record) {
  const acknowledgements = record.acknowledgements ?? []
  if (acknowledgements.some(({ status }) => status === 'failed')) return 'failed'
  const consumerStates = ['Admin', 'User', 'Email'].map((server) =>
    acknowledgements.find((acknowledgement) => acknowledgement.server === server || acknowledgement.server === `${server} Server`)?.status,
  )
  if (consumerStates.every((status) => status === 'acknowledged')) return 'acknowledged'
  return 'pending'
}

export default function RecordStatus({ status }) {
  return (
    <span className={`record-status status-${status}`}>
      <span className="record-status-dot" aria-hidden="true" />
      {statusLabels[status] ?? statusLabels.unavailable}
    </span>
  )
}
