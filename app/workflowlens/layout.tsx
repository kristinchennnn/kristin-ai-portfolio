import type { Metadata } from "next";
import { WorkflowLensFooter, WorkflowLensHeader } from "@/components/workflowlens/site-header";

export const metadata: Metadata = {
  title: { default: "WorkflowLens | AI Workflow Opportunity Assessment", template: "%s | WorkflowLens" },
  description: "Turn a messy business workflow into a practical, risk-aware AI adoption plan with WorkflowLens by Kristin Chen.",
};

export default function WorkflowLensLayout({ children }: { children: React.ReactNode }) {
  return <div className="workflowlens"><WorkflowLensHeader /><main>{children}</main><WorkflowLensFooter /></div>;
}
