import type { Metadata } from "next";
import Link from "next/link";
import { ReportView } from "@/components/workflowlens/report-view";
import { demoReport } from "@/lib/workflowlens";

export const metadata: Metadata = {
  title: "AI Workflow Assessment Example",
  description: "Explore a complete AI workflow opportunity assessment for a synthetic cross-channel campaign reporting process.",
  alternates: { canonical: "/workflowlens/demo" },
  openGraph: { title: "WorkflowLens demo — Campaign reporting AI assessment", description: "See what to automate, assist, and keep human in a campaign reporting workflow.", url: "/workflowlens/demo" },
};

export default function DemoPage() {
  return <div className="wl-shell wl-demo-page">
    <header className="wl-demo-intro"><p className="wl-kicker">Guided demonstration · Synthetic data</p><h1>Campaign reporting,<br /><em>mapped for useful AI.</em></h1><p>This case is intentionally synthetic. It demonstrates the product and Kristin’s consulting approach without representing a former employer’s internal process or claiming client outcomes.</p><div><Link className="wl-button wl-button-dark" href="/workflowlens/analyze">Analyze your own workflow →</Link><Link className="wl-text-link" href="/workflowlens/methodology">How the assessment works ↗</Link></div></header>
    <ReportView report={demoReport} />
  </div>;
}
