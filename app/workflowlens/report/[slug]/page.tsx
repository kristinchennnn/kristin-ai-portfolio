import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DeleteReport } from "@/components/workflowlens/delete-report";
import { ReportView } from "@/components/workflowlens/report-view";
import { getWorkflowReport } from "@/lib/workflowlens-api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Unlisted AI Workflow Assessment",
  description: "A private, expiring WorkflowLens report.",
  robots: { index: false, follow: false, nocache: true },
  openGraph: { title: "Unlisted WorkflowLens assessment", description: "A private, expiring AI workflow opportunity assessment.", type: "website" },
};

export default async function SharedReportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const report = await getWorkflowReport(slug);
  if (!report) notFound();
  return <div className="wl-shell wl-shared-report"><div className="wl-unlisted-note"><span>Unlisted</span>This report expires {new Date(report.expiresAt).toLocaleDateString("en-CA", { dateStyle: "long" })}. Anyone with the link can view it.</div><DeleteReport slug={slug} /><ReportView report={report} exportBase={`/workflowlens/report/${slug}`} /></div>;
}
