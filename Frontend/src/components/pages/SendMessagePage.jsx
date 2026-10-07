import { useEffect, useRef, useState } from 'react'
import { SendIcon } from '../layout/Icons.jsx'

const MAX_MESSAGE_LENGTH = 500

export default function SendMessagePage({ onSubmitMessage }) {
  const [message, setMessage] = useState('')
  const [clearance, setClearance] = useState('Admin')
  const [hasError, setHasError] = useState(false)
  const [submissionError, setSubmissionError] = useState('')
  const [isSuccessVisible, setIsSuccessVisible] = useState(false)
  const successTimeout = useRef(null)

  useEffect(() => () => window.clearTimeout(successTimeout.current), [])

  function handleMessageChange(event) {
    const nextMessage = event.target.value
    setMessage(nextMessage)
    if (nextMessage.trim()) setHasError(false)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!message.trim()) {
      setHasError(true)
      return
    }

    setHasError(false)
    setSubmissionError('')
    setIsSuccessVisible(false)
    window.clearTimeout(successTimeout.current)
    if (!onSubmitMessage) return

    try {
      await onSubmitMessage(message.trim(), clearance)
      setMessage('')
      setIsSuccessVisible(true)
      successTimeout.current = window.setTimeout(() => setIsSuccessVisible(false), 4000)
    } catch {
      setSubmissionError('Message could not be sent. Try again.')
    }
  }

  return (
    <div className="send-page">
      <div className="send-page-heading">
        <div>
          <p className="eyebrow">Broadcast operations</p>
          <h1 className="page-title">Send a message</h1>
          <p className="page-description">Publish a message to all connected consumers across the relay network.</p>
        </div>
        <div className="consumer-availability" aria-label="3 of 3 consumers online">
          <span className="health-dot" aria-hidden="true" />
          <span className="consumer-count">3 <span>/ 3</span></span>
          <span className="consumer-label">Consumers online</span>
        </div>
      </div>

      {isSuccessVisible && (
        <div className="send-success" role="status">
          <span className="success-check" aria-hidden="true">✓</span>
          <span className="success-copy">
            <strong>Message sent successfully.</strong>
            <span>Delivery acknowledgements are now being collected.</span>
          </span>
          <button type="button" className="dismiss-success" aria-label="Dismiss confirmation" onClick={() => setIsSuccessVisible(false)}>×</button>
        </div>
      )}

      <form className="composer-card" onSubmit={handleSubmit}>
        <div className="composer-heading">
          <div className="composer-heading-mark" aria-hidden="true"><SendIcon /></div>
          <div>
            <h2>Message payload</h2>
            <p>Compose the broadcast content and define its access level.</p>
          </div>
        </div>

        <div className="message-field-group">
          <label className="field-label" htmlFor="broadcast-message">Message</label>
          <div className={`textarea-wrap${hasError ? ' has-error' : ''}`}>
            <textarea
              id="broadcast-message"
              name="message"
              value={message}
              maxLength={MAX_MESSAGE_LENGTH}
              onChange={handleMessageChange}
              placeholder="Enter the message to broadcast across the network..."
              aria-invalid={hasError}
              aria-describedby={hasError ? 'message-error message-counter' : 'message-helper message-counter'}
              className="message-textarea"
            />
            <span className="character-count" id="message-counter" aria-live="polite">{message.length} / {MAX_MESSAGE_LENGTH}</span>
          </div>
          {hasError ? (
            <p className="field-feedback field-error" id="message-error" role="alert">
              <span aria-hidden="true">!</span> Enter a message before sending.
            </p>
          ) : (
            <p className="field-feedback field-helper" id="message-helper">Messages are immutable once published.</p>
          )}
          {submissionError && <p className="field-feedback field-error" role="alert"><span aria-hidden="true">!</span>{submissionError}</p>}
        </div>

        <div className="clearance-section">
          <div className="clearance-copy">
            <label className="field-label" htmlFor="message-clearance">Clearance level</label>
            <p>Controls which audience is authorized to receive this message.</p>
          </div>
          <div className="select-wrap">
            <select id="message-clearance" name="clearance" value={clearance} onChange={(event) => setClearance(event.target.value)}>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
            <span aria-hidden="true" className="select-chevron" />
          </div>
        </div>

        <div className="composer-footer">
          <p className="publication-note"><span className="publication-dot" aria-hidden="true" />Publishes to <strong>Admin & Users</strong></p>
          <button className="send-button" type="submit">
            <SendIcon />
            <span>Send Message</span>
          </button>
        </div>
      </form>
    </div>
  )
}
