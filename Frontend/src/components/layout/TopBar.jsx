import { ChevronIcon } from './Icons.jsx'

export default function TopBar({ pageTitle }) {
  return (
    <header className="topbar">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <span className="breadcrumb-root">Relay</span>
        <ChevronIcon />
        <span className="breadcrumb-current" aria-current="page">{pageTitle}</span>
      </nav>
      <div className="environment" aria-label="Environment: Production">
        <span className="health-dot" aria-hidden="true" />
        <span>Production</span>
      </div>
    </header>
  )
}
