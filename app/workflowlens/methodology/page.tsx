import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Opportunity Assessment Methodology",
  description: "How WorkflowLens evaluates AI impact, feasibility, readiness, risk, change effort, human controls, and pilot value.",
  alternates: { canonical: "/workflowlens/methodology" },
};

const dimensions = [
  ["Impact", "How materially could the intervention improve time, quality, consistency, or decision usefulness?"],
  ["Feasibility", "Can the task be supported with available technology and a bounded, testable implementation?"],
  ["Data readiness", "Are the inputs available, understandable, permitted, and sufficiently reliable?"],
  ["Risk", "What is the consequence of an incorrect, biased, insecure, or unexplained result?"],
  ["Change effort", "How much process redesign, training, ownership, and integration will adoption require?"],
];

export default function MethodologyPage() {
  return <div className="wl-shell wl-methodology">
    <header><p className="wl-kicker">Methodology · Version 1.0</p><h1>Evidence before<br /><em>automation.</em></h1><p>WorkflowLens is a decision-support tool, not an autonomous transformation strategy. Its rubric makes the reasoning inspectable so a team can challenge assumptions before implementation.</p></header>
    <section><p className="wl-section-number">01 / Assessment sequence</p><h2>Start with work, not tools</h2><ol className="wl-method-steps"><li><span>01</span><div><h3>Understand the outcome</h3><p>Define the decision, deliverable, people, volume, constraints, and business priority.</p></div></li><li><span>02</span><div><h3>Map the current state</h3><p>Extract tasks, owners, systems, handoffs, inputs, outputs, and friction—then require human correction.</p></div></li><li><span>03</span><div><h3>Assess each task</h3><p>Recommend human work, AI assistance, automation, redesign, or no AI using five consistent dimensions.</p></div></li><li><span>04</span><div><h3>Design the pilot</h3><p>Specify checkpoints, controls, metrics, assumptions, and a staged implementation roadmap.</p></div></li></ol></section>
    <section><p className="wl-section-number">02 / Scoring rubric</p><h2>Five dimensions, scored 1–5</h2><div className="wl-dimension-grid">{dimensions.map(([title, body]) => <div key={title}><h3>{title}</h3><p>{body}</p><span>1 low / 5 high</span></div>)}</div></section>
    <section className="wl-method-dark"><p className="wl-section-number">03 / Recommendation logic</p><h2>“Do not use AI” is a valid result</h2><div className="wl-logic-list"><div><strong>Keep Human</strong><p>Judgment, accountability, empathy, negotiation, or high-consequence approval dominates.</p></div><div><strong>AI Assist</strong><p>AI can draft, classify, summarize, compare, or triage while a person verifies the result.</p></div><div><strong>Automate</strong><p>The task is repetitive, rules are stable, exceptions are bounded, and failure is detectable.</p></div><div><strong>Redesign First</strong><p>The process or data is too inconsistent to automate responsibly.</p></div><div><strong>Do Not Use AI</strong><p>Risk, legality, data rights, or explainability makes AI inappropriate for the task.</p></div></div></section>
    <section><p className="wl-section-number">04 / Evaluation & limits</p><h2>What the product is—and is not</h2><div className="wl-two-grid"><div><h3>Evaluation approach</h3><ul><li>Synthetic fixtures across marketing, research, finance, operations, and support.</li><li>Schema, evidence alignment, risk recognition, and prompt-injection tests.</li><li>Manual review for recommendation fit, actionability, and unsupported claims.</li></ul></div><div><h3>Limits</h3><ul><li>The report cannot replace legal, security, privacy, or domain-expert review.</li><li>Scores organize a discussion; they are not scientific measurements.</li><li>ROI scenarios represent potential capacity value, not guaranteed savings.</li></ul></div></div></section>
    <div className="wl-centered-actions"><Link className="wl-button wl-button-dark" href="/workflowlens/analyze">Run an assessment →</Link><Link className="wl-text-link" href="/workflowlens/demo">See the worked example ↗</Link></div>
  </div>;
}
