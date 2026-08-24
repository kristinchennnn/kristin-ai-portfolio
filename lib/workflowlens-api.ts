import { workflowReportSchema, type WorkflowReport } from "@/lib/workflowlens";

export const WORKFLOWLENS_API_URL = process.env.WORKFLOWLENS_API_URL
  ?? process.env.NEXT_PUBLIC_WORKFLOWLENS_API_URL
  ?? "https://workflowlens-api.kristinzhiyingchen.com";

export async function getWorkflowReport(slug: string): Promise<WorkflowReport | null> {
  if (!/^[A-Za-z0-9_-]{20,40}$/.test(slug)) return null;
  try {
    const response = await fetch(`${WORKFLOWLENS_API_URL}/v1/reports/${encodeURIComponent(slug)}`, { cache: "no-store" });
    if (!response.ok) return null;
    const data = await response.json() as { report: unknown };
    return workflowReportSchema.parse(data.report);
  } catch {
    return null;
  }
}
