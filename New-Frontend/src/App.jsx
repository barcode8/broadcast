import { useState } from 'react'
import { useBroadcastMessage } from './hooks/useBroadcastMessage'
import { useGetAckReport } from './hooks/useGetAckReport'
import { useGetAllMessages } from './hooks/useGetAllMessages'
import './App.css'

function App() {
  const [page, setPage] = useState('send')
  const [messageID, setMessageID] = useState('')

  const openReport = (id = '') => {
    setMessageID(id)
    setPage('report')
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#send" onClick={(event) => { event.preventDefault(); setPage('send') }}>
          <span className="brand-mark">B</span>
          <span>Broadcast</span>
        </a>
        <nav className="navigation" aria-label="Main navigation">
          <button className={page === 'send' ? 'nav-link active' : 'nav-link'} onClick={() => setPage('send')}>
            Send message
          </button>
          <button className={page === 'report' ? 'nav-link active' : 'nav-link'} onClick={() => setPage('report')}>
            Acknowledgement report
          </button>
        </nav>
      </header>

      {page === 'send' ? (
        <SendMessagePage onViewReport={openReport} />
      ) : (
        <AcknowledgementReportPage
          messageID={messageID}
          onSelectMessage={setMessageID}
        />
      )}
    </main>
  )
}

function SendMessagePage({ onViewReport }) {
  const { formData, handleChange, handleSubmit } = useBroadcastMessage()
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const submitMessage = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    setResult(null)

    try {
      const response = await handleSubmit()
      if (!response?.success) {
        setError(response?.response || 'The message could not be sent. Please try again.')
        return
      }
      setResult(response)
    } catch {
      setError('Could not connect to the broadcast service. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="page-content">
      <div className="page-heading">
        <p className="eyebrow">MESSAGE CENTER</p>
        <h1>Send a message</h1>
        <p>Write a message and choose who should receive it.</p>
      </div>

      <form className="panel message-form" onSubmit={submitMessage}>
        <label htmlFor="content">Message</label>
        <textarea
          id="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Type your message here..."
          rows="6"
          required
        />

        <label htmlFor="clearance">Audience</label>
        <select id="clearance" value={formData.clearance} onChange={handleChange} required>
          <option value="" disabled>Select an audience</option>
          <option value="user">Users</option>
          <option value="admin">Admins</option>
        </select>

        <button className="primary-button" type="submit" disabled={submitting}>
          {submitting ? 'Sending…' : 'Send message'}
        </button>

        {error && <p className="notice error" role="alert">{error}</p>}
        {result && (
          <div className="notice success" role="status">
            <strong>{result.response || 'Message sent for broadcasting.'}</strong>
            {result.message?._id && (
              <>
                <span className="message-id">Message ID: {result.message._id}</span>
                <button className="text-button" type="button" onClick={() => onViewReport(result.message._id)}>
                  View acknowledgement report →
                </button>
              </>
            )}
          </div>
        )}
      </form>
    </section>
  )
}

function AcknowledgementReportPage({ messageID, onSelectMessage }) {
  const messages = useGetAllMessages()
  const report = useGetAckReport(messageID)

  return (
    <section className="page-content">
      <div className="page-heading">
        <p className="eyebrow">DELIVERY STATUS</p>
        <h1>Message acknowledgement report</h1>
        <p>Select a message to see which consumers acknowledged it.</p>
      </div>

      {messages === null ? (
        <p className="panel empty-state">Loading messages…</p>
      ) : messages.length ? (
        <div className="message-tabs" role="tablist" aria-label="Messages">
          {messages.map((message) => (
            <div className="message-item" key={message._id}>
              <button
                className={message._id === messageID ? 'message-tab selected' : 'message-tab'}
                id={`message-tab-${message._id}`}
                onClick={() => onSelectMessage(message._id)}
                role="tab"
                aria-selected={message._id === messageID}
                aria-controls={`acknowledgement-panel-${message._id}`}
              >
                <span className="tab-content">{message.content}</span>
                <span className="tab-meta">{message.clearance} · {message._id}</span>
              </button>
              {message._id === messageID && (
                <AcknowledgementDetails messageID={messageID} report={report} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="panel empty-state">No messages found. Send a message to see its acknowledgement report.</p>
      )}
    </section>
  )
}

function AcknowledgementDetails({ messageID, report }) {
  return (
    <section className="panel report-panel" id={`acknowledgement-panel-${messageID}`} role="tabpanel" aria-labelledby={`message-tab-${messageID}`} aria-live="polite">
      <div className="report-heading">
        <div>
          <h2>Acknowledgements</h2>
          <p className="muted">Message ID: {messageID}</p>
        </div>
        <span className="count-badge">{report === null ? 'Loading…' : `${report.length} ${report.length === 1 ? 'record' : 'records'}`}</span>
      </div>
      {report === null ? (
        <p className="empty-state">Loading acknowledgement records…</p>
      ) : report.length ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Consumer</th><th>Status</th><th>Record ID</th></tr>
            </thead>
            <tbody>
              {report.map((ack) => (
                <tr key={ack._id}>
                  <td className="consumer-name">{ack.consumer}</td>
                  <td><span className={ack.ackStatus ? 'status-pill received' : 'status-pill pending'}>
                    {ack.ackStatus ? 'Acknowledged' : 'Not acknowledged'}
                  </span></td>
                  <td className="record-id">{ack._id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="empty-state">No acknowledgement records found for this message yet.</p>
      )}
    </section>
  )
}

export default App
