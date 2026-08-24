import Link from "next/link";

export function WorkflowLensHeader() {
  return (
    <header className="wl-header">
      <div className="wl-shell wl-header-inner">
        <Link className="wl-brand" href="/workflowlens">
          Workflow<span>Lens</span>
          <small>by Kristin Chen</small>
        </Link>
        <nav aria-label="WorkflowLens navigation">
          <Link href="/workflowlens/demo">Demo</Link>
          <Link href="/workflowlens/methodology">Methodology</Link>
          <Link className="wl-nav-cta" href="/workflowlens/analyze">Analyze a workflow</Link>
        </nav>
      </div>
    </header>
  );
}

export function WorkflowLensFooter() {
  return (
    <footer className="wl-footer">
      <div className="wl-shell wl-footer-grid">
        <div>
          <p className="wl-kicker">WorkflowLens by Kristin Chen</p>
          <h2>Have a workflow worth improving?</h2>
        </div>
        <div className="wl-footer-actions">
          <a className="wl-button wl-button-lime" href="mailto:zchen.msc2026@ivey.ca?subject=AI%20workflow%20discussion">Discuss an AI workflow ↗</a>
          <a className="wl-text-link" href="https://www.linkedin.com/in/zhiying-kristin-chen/" target="_blank" rel="noreferrer">Connect on LinkedIn ↗</a>
        </div>
      </div>
      <div className="wl-shell wl-footer-meta">
        <Link href="/">Kristin Chen portfolio</Link>
        <Link href="/privacy">Privacy</Link>
        <span>Toronto, Canada</span>
      </div>
    </footer>
  );
}
