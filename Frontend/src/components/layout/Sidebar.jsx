import { ChevronIcon, RecordsIcon, SendIcon, SignalMark } from './Icons.jsx'

const destinations = [
  { id: 'send', label: 'Send Message', Icon: SendIcon },
  { id: 'records', label: 'Message Records', Icon: RecordsIcon },
]

export default function Sidebar({ currentPage, onNavigate }) {
  return (
    <aside className="sidebar" aria-label="Relay workspace navigation">
      <a className="brand" href="#main" aria-label="Relay Broadcast Control home">
        <SignalMark />
        <span className="brand-copy">
          <span className="brand-name">Relay</span>
          <span className="brand-description">Broadcast Control</span>
        </span>
      </a>

      <div className="navigation-group">
        <p className="navigation-label">Workspace</p>
        <nav aria-label="Workspace">
          {destinations.map(({ id, label, Icon }) => (
            <button
              className={`navigation-item${currentPage === id ? ' is-active' : ''}`}
              type="button"
              key={id}
              aria-current={currentPage === id ? 'page' : undefined}
              aria-label={label}
              title={label}
              onClick={() => onNavigate(id)}
            >
              <Icon />
              <span className="navigation-item-label">{label}</span>
              <ChevronIcon />
            </button>
          ))}
        </nav>
      </div>

      <div className="system-health" aria-label="System status: all systems operational, 3 consumers connected">
        <span className="health-dot" aria-hidden="true" />
        <span className="health-copy">
          <span className="health-title">All systems operational</span>
          <span className="health-detail">3 consumers connected</span>
        </span>
      </div>
    </aside>
  )
}
