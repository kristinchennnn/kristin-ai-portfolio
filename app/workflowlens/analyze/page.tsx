import type { Metadata } from "next";
import { WorkflowAnalyzer } from "@/components/workflowlens/analyzer";

export const metadata: Metadata = {
  title: "Analyze a Workflow",
  description: "Map a business workflow and create a practical AI opportunity assessment.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/workflowlens/analyze" },
};

export default function AnalyzePage() { return <WorkflowAnalyzer />; }
