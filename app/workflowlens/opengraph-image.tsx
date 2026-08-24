import { ImageResponse } from "next/og";

export const alt = "WorkflowLens — AI Workflow Opportunity Assessment";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function WorkflowLensOpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", padding: 70, background: "#16201e", color: "#f4f3ed", position: "relative" }}><div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "68%" }}><div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>Workflow<span style={{ color: "#c6df4d" }}>Lens</span><span style={{ fontSize: 16, color: "#9bb8c8", marginLeft: 12 }}>by Kristin Chen</span></div><div style={{ display: "flex", flexDirection: "column" }}><div style={{ display: "flex", flexDirection: "column", fontSize: 78, fontWeight: 700, lineHeight: .95, letterSpacing: -5 }}>Find where AI<span>actually helps.</span></div><div style={{ fontSize: 24, color: "#b7c2bc", marginTop: 26 }}>AI workflow opportunity & adoption planner</div></div></div><div style={{ width: 290, height: 430, borderRadius: 150, background: "#9bb8c8", border: "2px solid #c6df4d", marginLeft: "auto" }} /></div>, size);
}
