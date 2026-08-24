import { OperationsReportDocument } from "@/components/pdf/blocks/report-operations/report-operations";
import type { BaseReportData } from "@/components/pdf/blocks/report-operations/report.types";
import { executiveTheme } from "@/components/pdf/theme-executive";
import { getWorkflowReport } from "@/lib/workflowlens-api";
import type { WorkflowReport } from "@/lib/workflowlens";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const workflowLensPdfTheme = {
  ...executiveTheme,
  name: "workflowlens",
  colors: { ...executiveTheme.colors, foreground: "#16201e", background: "#f8f7f1", muted: "#e9ebe3", mutedForeground: "#5d6965", primary: "#16201e", primaryForeground: "#f8f7f1", accent: "#9bb8c8", border: "#cfd3ca", success: "#718923", info: "#547e95", warning: "#9a6b15" },
  typography: { body: { ...executiveTheme.typography.body, fontFamily: "sans-serif" }, heading: { ...executiveTheme.typography.heading, fontFamily: "serif" } },
};

function reportData(report: WorkflowReport): BaseReportData {
  const categoryCount = (category: string) => report.recommendations.filter((item) => item.category === category).length;
  return {
    title: report.workflowProfile.name,
    subtitle: `${report.workflowProfile.team} · ${report.workflowProfile.industry}`,
    generatedAt: new Date(report.generatedAt).toLocaleDateString("en-CA", { dateStyle: "medium" }),
    period: "AI workflow assessment",
    author: "Kristin Chen · WorkflowLens",
    summary: [
      { label: "Workflow steps", value: String(report.currentState.steps.length), trend: "mapped", tone: "info" },
      { label: "AI assist", value: String(categoryCount("AI Assist")), trend: "human reviewed", tone: "info" },
      { label: "Automate", value: String(categoryCount("Automate")), trend: "pilot first", tone: "success" },
      { label: "Keep human", value: String(categoryCount("Keep Human") + categoryCount("Do Not Use AI")), trend: "accountability", tone: "warning" },
    ],
    rows: report.recommendations.map((item) => {
      const step = report.currentState.steps.find((candidate) => candidate.id === item.stepId);
      return { label: step?.name ?? item.stepId, owner: item.category, status: item.confidence, progress: Math.round(((item.impact + item.feasibility + item.readiness) / 15) * 100), risk: item.risk >= 4 ? "High" : item.risk === 3 ? "Medium" : "Low" };
    }),
    series: report.roi.scenarios.map((scenario) => ({ label: scenario.name, value: Math.round(scenario.monthlyHoursSaved) })),
    highlights: [report.executiveSummary, ...report.frictionPoints.slice(0, 2).map((item) => `${item.title}: ${item.consequence}`)],
  };
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const report = await getWorkflowReport(slug);
  if (!report) return Response.json({ error: "Report not found or expired." }, { status: 404 });
  const { render } = await import("takumi-pdf");
  const pdf = await render(<OperationsReportDocument data={reportData(report)} theme={workflowLensPdfTheme} />, { size: "a4", margin: 0, metadata: { title: `${report.workflowProfile.name} — WorkflowLens`, authors: ["Kristin Chen"] } });
  const safeName = report.workflowProfile.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "workflow";
  return new Response(new Uint8Array(pdf).buffer, { headers: { "Content-Type": "application/pdf", "Content-Disposition": `attachment; filename="workflowlens-${safeName}.pdf"`, "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow, noarchive" } });
}
