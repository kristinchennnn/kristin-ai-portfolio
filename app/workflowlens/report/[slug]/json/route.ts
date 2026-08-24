import { getWorkflowReport } from "@/lib/workflowlens-api";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const report = await getWorkflowReport(slug);
  if (!report) return Response.json({ error: "Report not found or expired." }, { status: 404 });
  const safeName = report.workflowProfile.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "workflow";
  return new Response(JSON.stringify(report, null, 2), { headers: { "Content-Type": "application/json; charset=utf-8", "Content-Disposition": `attachment; filename="workflowlens-${safeName}.json"`, "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow, noarchive" } });
}
