import './App.css'

function App() {
  return (
    <main className="thank-you">
      <div className="card">
        <img
          src="/hydra-logo.png"
          alt="Hydra Pool Services"
          className="logo"
          width="720"
          height="454"
        />

        <div className="badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <p className="eyebrow">Hydra Pool Services</p>
        <h1>Thank You</h1>
        <p className="lede">
          Thank you for trusting Hydra Pool Services! We truly appreciate you
          reaching out to us.
        </p>

        <a className="cta" href="https://www.hydrapoolservices.com">
          Return to homepage
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>

        <p className="footnote">
          Questions? Email <a href="mailto:info@hydrapoolservices.com">info@hydrapoolservices.com</a>
        </p>
      </div>
    </main>
  )
}

export default App
