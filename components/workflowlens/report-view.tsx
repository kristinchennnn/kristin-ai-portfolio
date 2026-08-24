import { CopySummary } from "@/components/workflowlens/copy-summary";
import type { WorkflowReport } from "@/lib/workflowlens";

const categoryClass: Record<string, string> = {
  "Keep Human": "human",
  "AI Assist": "assist",
  Automate: "automate",
  "Redesign First": "redesign",
  "Do Not Use AI": "avoid",
};

function money(value: number) {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(value);
}

export function ReportView({ report, exportBase }: { report: WorkflowReport; exportBase?: string }) {
  const stepById = new Map(report.currentState.steps.map((step) => [step.id, step]));

  return (
    <article className="wl-report">
      <header className="wl-report-hero">
        <div>
          <p className="wl-kicker">AI opportunity assessment · {report.schemaVersion}</p>
          <h1>{report.workflowProfile.name}</h1>
          <p>{report.workflowSummary}</p>
        </div>
        <dl className="wl-report-meta">
          <div><dt>Team</dt><dd>{report.workflowProfile.team}</dd></div>
          <div><dt>Industry</dt><dd>{report.workflowProfile.industry}</dd></div>
          <div><dt>Generated</dt><dd>{new Date(report.generatedAt).toLocaleDateString("en-CA", { dateStyle: "medium" })}</dd></div>
        </dl>
      </header>

      {exportBase ? (
        <div className="wl-export-bar" aria-label="Report exports">
          <a href={`${exportBase}/pdf`}>Download PDF ↓</a>
          <a href={`${exportBase}/json`}>Download JSON ↓</a>
          <CopySummary text={report.executiveSummary} />
        </div>
      ) : null}

      <section className="wl-report-section wl-summary-panel">
        <p className="wl-section-number">01 / Executive assessment</p>
        <h2>The practical opportunity</h2>
        <p className="wl-report-lede">{report.executiveSummary}</p>
      </section>

      <section className="wl-report-section">
        <p className="wl-section-number">02 / Current state</p>
        <h2>Where the work happens now</h2>
        <div className="wl-process" role="list">
          {report.currentState.steps.map((step, index) => (
            <div className="wl-process-step" role="listitem" key={step.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.name}</h3>
              <p>{step.owner}</p>
              {step.painPoint ? <small>{step.painPoint}</small> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="wl-report-section">
        <p className="wl-section-number">03 / Friction</p>
        <h2>What is getting in the way</h2>
        <div className="wl-three-grid">
          {report.frictionPoints.map((item) => (
            <div className="wl-insight-card" key={item.title}>
              <h3>{item.title}</h3><p>{item.evidence}</p><small>{item.consequence}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="wl-report-section">
        <p className="wl-section-number">04 / Recommendations</p>
        <h2>What to automate, assist, or keep human</h2>
        <div className="wl-recommendations">
          {report.recommendations.map((item) => {
            const step = stepById.get(item.stepId);
            return (
              <article className="wl-recommendation" key={item.stepId}>
                <div className="wl-rec-heading">
                  <div><p>{step?.owner ?? "Workflow task"}</p><h3>{step?.name ?? item.stepId}</h3></div>
                  <span className={`wl-category ${categoryClass[item.category] ?? "assist"}`}>{item.category}</span>
                </div>
                <p>{item.rationale}</p>
                <div className="wl-scores" aria-label="Recommendation scores">
                  {(["impact", "feasibility", "readiness", "risk", "changeEffort"] as const).map((score) => (
                    <div key={score}><span>{score === "changeEffort" ? "Change effort" : score}</span><strong>{item[score]}/5</strong></div>
                  ))}
                </div>
                <div className="wl-rec-notes">
                  <p><strong>Human checkpoint</strong>{item.humanCheckpoint}</p>
                  <p><strong>First pilot action</strong>{item.pilotAction}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="wl-report-section wl-dark-section">
        <p className="wl-section-number">05 / Future state</p>
        <h2>A controlled AI-enabled workflow</h2>
        <ol className="wl-future-list">
          {report.futureState.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}
        </ol>
        <div className="wl-two-grid">
          <div><h3>Human controls</h3><ul>{report.humanControls.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><h3>Risks to manage</h3><ul>{report.risks.map((item) => <li key={item.title}><strong>{item.title}</strong>{item.mitigation}</li>)}</ul></div>
        </div>
      </section>

      <section className="wl-report-section">
        <p className="wl-section-number">06 / Pilot roadmap</p>
        <h2>Move from evidence to adoption</h2>
        <div className="wl-roadmap">
          {(["thirtyDays", "sixtyDays", "ninetyDays"] as const).map((period, index) => (
            <div key={period}><span>{["30", "60", "90"][index]} days</span><ul>{report.roadmap[period].map((item) => <li key={item}>{item}</li>)}</ul></div>
          ))}
        </div>
      </section>

      <section className="wl-report-section">
        <p className="wl-section-number">07 / Illustrative ROI</p>
        <h2>Capacity value, with assumptions visible</h2>
        <p className="wl-note">This is a scenario—not a guaranteed financial return. Change the assumptions before using it in a business case.</p>
        <div className="wl-roi-grid">
          {report.roi.scenarios.map((scenario) => (
            <div className={scenario.name === "Expected" ? "featured" : ""} key={scenario.name}>
              <span>{scenario.name}</span><strong>{money(scenario.annualCapacityValue)}</strong><p>annual capacity value</p>
              <small>{scenario.monthlyHoursSaved} hours/month · {scenario.timeReduction}% time reduction</small>
            </div>
          ))}
        </div>
      </section>

      <section className="wl-report-section wl-report-end">
        <div>
          <p className="wl-section-number">08 / Measurement & limits</p><h2>What to prove in a pilot</h2>
          <ul>{report.successMetrics.map((metric) => <li key={metric.name}><strong>{metric.name}</strong>{metric.measure}</li>)}</ul>
        </div>
        <div><h3>Important limitations</h3><ul>{report.limitations.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </section>
    </article>
  );
}
