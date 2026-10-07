import { useCallback, useState } from 'react'
import Sidebar from './components/layout/Sidebar.jsx'
import TopBar from './components/layout/TopBar.jsx'
import MessageRecordsPage from './components/pages/MessageRecordsPage.jsx'
import SendMessagePage from './components/pages/SendMessagePage.jsx'
import AcknowledgementDrawer from './components/records/AcknowledgementDrawer.jsx'
import './App.css'

const pageTitles = {
  send: 'Send Message',
  records: 'Message Records',
}

const EMPTY_RECORDS = []

function App({ initialRecords = EMPTY_RECORDS, onSubmitMessage, onViewRecord }) {
  const [currentPage, setCurrentPage] = useState('send')
  const [records, setRecords] = useState(initialRecords)
  const [selectedRecord, setSelectedRecord] = useState(null)
  const pageTitle = pageTitles[currentPage]
  const handleNavigate = useCallback((page) => {
    setCurrentPage(page)
    setSelectedRecord(null)
  }, [])
  const handleCloseRecord = useCallback(() => setSelectedRecord(null), [])

  async function handleSubmitMessage(message, clearance) {
    if (!onSubmitMessage) return
    const createdRecord = await onSubmitMessage(message, clearance)
    if (createdRecord) setRecords((currentRecords) => [createdRecord, ...currentRecords])
  }

  return (
    <div className="app-shell">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      <div className="workspace">
        <TopBar pageTitle={pageTitle} />
        <main className="page-content" id="main" tabIndex={-1}>
          {currentPage === 'send' ? (
            <SendMessagePage onSubmitMessage={onSubmitMessage ? handleSubmitMessage : undefined} />
          ) : (
            <MessageRecordsPage records={records} onViewRecord={(record) => {
              setSelectedRecord(record)
              onViewRecord?.(record)
            }} />
          )}
        </main>
      </div>
      {selectedRecord && <AcknowledgementDrawer record={selectedRecord} onClose={handleCloseRecord} />}
    </div>
  )
}

export default App
