import { useEffect, useRef } from 'react'
import { CloseIcon, ServerIcon } from '../layout/Icons.jsx'
import RecordMetadata from './RecordMetadata.jsx'
import { Timestamp } from './RecordValues.jsx'
import RecordStatus, { getRecordStatus } from './RecordStatus.jsx'

const consumers = [
  { key: 'Admin', label: 'Admin Server' },
  { key: 'User', label: 'User Server' },
  { key: 'Email', label: 'Email Server' },
]

const overallMessages = {
  acknowledged: 'Delivery complete across all consumers',
  pending: 'Waiting for remaining consumer responses',
  failed: 'One or more consumers reported a failure',
}

function getConsumerStatus(acknowledgement) {
  return acknowledgement?.status ?? 'unavailable'
}

export default function AcknowledgementDrawer({ record, onClose }) {
  const closeButtonRef = useRef(null)
  const drawerRef = useRef(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement
    closeButtonRef.current?.focus()
    document.body.classList.add('drawer-open')

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key === 'Tab') {
        const focusableElements = drawerRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )
        if (!focusableElements?.length) {
          event.preventDefault()
          return
        }

        const first = focusableElements[0]
        const last = focusableElements[focusableElements.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('drawer-open')
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) previouslyFocused.focus()
    }
  }, [onClose])

  const acknowledgements = record.acknowledgements ?? []
  const acknowledgedCount = acknowledgements.filter(({ status }) => status === 'acknowledged').length
  const overallStatus = getRecordStatus(record)

  return (
    <div className="drawer-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section ref={drawerRef} className="acknowledgement-drawer" role="dialog" aria-modal="true" aria-labelledby="acknowledgement-drawer-title">
        <header className="drawer-header">
          <div>
            <p className="eyebrow">Message details</p>
            <h2 id="acknowledgement-drawer-title">Acknowledgement record</h2>
          </div>
          <button ref={closeButtonRef} className="drawer-close" type="button" onClick={onClose} aria-label="Close acknowledgement record">
            <CloseIcon />
          </button>
        </header>

        <div className="drawer-content">
          <section className={`drawer-overall overall-${overallStatus}`} aria-label="Overall acknowledgement status" aria-live="polite">
            <div className="overall-status-icon" aria-hidden="true">{overallStatus === 'acknowledged' ? '✓' : overallStatus === 'failed' ? '!' : '…'}</div>
            <div className="overall-copy">
              <strong>{acknowledgedCount} / 3 Acknowledged</strong>
              <span>{overallMessages[overallStatus]}</span>
            </div>
            <RecordStatus status={overallStatus} />
          </section>

          <section className="drawer-section payload-section" aria-labelledby="payload-title">
            <h3 id="payload-title">Message payload</h3>
            <p className="payload-content">{record.message || '—'}</p>
          </section>

          <RecordMetadata record={record} />

          <section className="drawer-section consumer-section" aria-labelledby="consumer-responses-title">
            <div className="consumer-section-heading">
              <div>
                <h3 id="consumer-responses-title">Consumer responses</h3>
                <p>Delivery acknowledgement by consumer.</p>
              </div>
              <span className="consumer-total">3 consumers</span>
            </div>
            <div className="consumer-table-scroll">
              <table className="consumer-table">
                <thead>
                  <tr>
                    <th scope="col">Server</th>
                    <th scope="col">Status</th>
                    <th scope="col">Acknowledged at</th>
                  </tr>
                </thead>
                <tbody>
                  {consumers.map(({ key, label }) => {
                    const acknowledgement = acknowledgements.find((item) => item.server === key || item.server === label)
                    const status = getConsumerStatus(acknowledgement)
                    return (
                      <tr key={key}>
                        <td className="consumer-server-cell"><ServerIcon /><span>{label}</span></td>
                        <td><RecordStatus status={status} /></td>
                        <td className="consumer-time">{status === 'acknowledged' ? <Timestamp value={acknowledgement.acknowledgedAt} timeOnly /> : '—'}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}
