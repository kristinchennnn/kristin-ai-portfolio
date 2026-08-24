import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WorkflowLens | AI Workflow Opportunity Assessment",
  description: "A working AI opportunity assessment tool by Kristin Chen. Map a workflow, identify responsible AI opportunities, and build a 30/60/90-day pilot plan.",
  alternates: { canonical: "/workflowlens" },
  openGraph: { title: "WorkflowLens — Find the useful AI in your workflow", description: "A practical, risk-aware AI workflow assessment by Kristin Chen.", url: "/workflowlens", type: "website" },
};

const applicationLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "WorkflowLens",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "An AI workflow opportunity and adoption planner created by Kristin Chen.",
  url: "https://kristinzhiyingchen.com/workflowlens",
  author: { "@type": "Person", name: "Kristin Chen", url: "https://kristinzhiyingchen.com", sameAs: ["https://www.linkedin.com/in/zhiying-kristin-chen/"] },
  offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
};

const capabilities = [
  ["Map the current state", "Turn natural-language notes and documents into an editable sequence of tasks, owners, systems, and handoffs."],
  ["Separate useful AI from AI theatre", "Classify each task as Keep Human, AI Assist, Automate, Redesign First, or Do Not Use AI."],
  ["Plan a responsible pilot", "Create human checkpoints, governance controls, success metrics, and a practical 30/60/90-day roadmap."],
];

export default function WorkflowLensPage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationLd) }} />
    <section className="wl-landing-hero wl-shell">
      <div className="wl-hero-copy">
        <p className="wl-kicker"><span /> AI workflow opportunity & adoption planner</p>
        <h1>Find where AI<br /><em>actually helps.</em></h1>
        <p className="wl-hero-lede">WorkflowLens turns a messy business process into a practical, risk-aware AI adoption plan—showing what to automate, what to augment, and what should remain human.</p>
        <div className="wl-hero-actions"><Link className="wl-button wl-button-dark" href="/workflowlens/analyze">Analyze a workflow →</Link><Link className="wl-text-link" href="/workflowlens/demo">Explore the guided demo ↗</Link></div>
        <small>No account · One live analysis daily · Documents never leave your browser</small>
      </div>
      <div className="wl-hero-diagram" aria-label="WorkflowLens assessment flow">
        <div className="wl-diagram-orbit" />
        <div className="wl-diagram-card one"><span>01</span><strong>Map</strong><small>People · tasks · systems</small></div>
        <div className="wl-diagram-card two"><span>02</span><strong>Assess</strong><small>Impact · feasibility · risk</small></div>
        <div className="wl-diagram-card three"><span>03</span><strong>Pilot</strong><small>Controls · metrics · roadmap</small></div>
      </div>
    </section>

    <section className="wl-proof-band"><div className="wl-shell"><span>Built as a working product</span><span>Human-in-the-loop by design</span><span>Grounded in workflow evidence</span><span>Transparent about limitations</span></div></section>

    <section className="wl-section wl-shell">
      <div className="wl-section-heading"><p className="wl-section-number">01 / The problem</p><h2>Most teams do not need<br /><em>more AI ideas.</em></h2></div>
      <div className="wl-editorial-grid"><p className="wl-big-copy">They need a way to decide where AI belongs in real work—and where it does not.</p><div><p>Generic automation advice skips the hard parts: fragmented processes, uncertain data, hidden handoffs, adoption effort, and accountability.</p><p>WorkflowLens starts with the work itself. It maps the process, makes assumptions visible, and turns AI opportunities into testable pilot decisions.</p></div></div>
    </section>

    <section className="wl-section wl-section-lined wl-shell">
      <div className="wl-section-heading"><p className="wl-section-number">02 / What it does</p><h2>From messy process<br /><em>to useful next step.</em></h2></div>
      <div className="wl-capability-grid">{capabilities.map(([title, description], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>

    <section className="wl-case-section">
      <div className="wl-shell wl-case-grid">
        <div><p className="wl-section-number">03 / Guided case</p><h2>Campaign reporting,<br /><em>reconsidered.</em></h2><p>A synthetic cross-channel reporting workflow shows how WorkflowLens combines automation, AI assistance, and human accountability without pretending the whole process should run itself.</p><Link className="wl-button wl-button-lime" href="/workflowlens/demo">Open the case study →</Link></div>
        <div className="wl-case-flow"><div><span>Manual exports</span><strong>Automate</strong></div><div><span>Metric mapping</span><strong>AI Assist</strong></div><div><span>Performance narrative</span><strong>AI Assist</strong></div><div><span>Leadership approval</span><strong>Keep Human</strong></div></div>
      </div>
    </section>

    <section className="wl-section wl-shell">
      <div className="wl-section-heading"><p className="wl-section-number">04 / Product decisions</p><h2>Responsible AI is<br /><em>in the architecture.</em></h2></div>
      <div className="wl-decision-grid">
        <div><h3>Review before recommendation</h3><p>The visitor corrects the extracted workflow before the model assesses it.</p></div>
        <div><h3>Documents stay local</h3><p>PDF, DOCX, and TXT files are converted to text in the browser and are never uploaded or stored.</p></div>
        <div><h3>ROI is deterministic</h3><p>Value scenarios use visible user assumptions—not financial numbers invented by a model.</p></div>
        <div><h3>Reports expire</h3><p>Unlisted reports automatically disappear after 30 days and can be deleted sooner.</p></div>
      </div>
      <div className="wl-centered-actions"><Link className="wl-text-link" href="/workflowlens/methodology">Read the full methodology ↗</Link></div>
    </section>

    <section className="wl-build-strip"><div className="wl-shell"><p className="wl-kicker">Designed and built by Kristin Chen</p><h2>Business framing. Workflow design.<br />AI prototyping. Evaluation. Adoption.</h2><p>WorkflowLens is an independent portfolio product that demonstrates how I move from an ambiguous AI question to a controlled, testable solution.</p></div></section>
  </>;
}
