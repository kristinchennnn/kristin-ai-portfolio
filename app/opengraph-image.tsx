import { ImageResponse } from "next/og";

export const alt = "Kristin Chen — AI Builder and Workflow Consultant";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 70, background: "#f4f3ed", color: "#16201e" }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}><b style={{ display: "flex" }}>KC<span style={{ color: "#8aa52b" }}>.</span></b><span>AI builder / workflow design</span></div><div style={{ display: "flex", flexDirection: "column" }}><div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -7 }}>Kristin Chen</div><div style={{ fontSize: 38, color: "#5d6965", marginTop: 18 }}>Making AI useful in real work.</div></div><div style={{ width: 320, height: 18, background: "#c6df4d" }} /></div>, size);
}
