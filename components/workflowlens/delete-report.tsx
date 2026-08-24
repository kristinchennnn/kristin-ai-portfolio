"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_WORKFLOWLENS_API_URL ?? "https://workflowlens-api.kristinzhiyingchen.com";

export function DeleteReport({ slug }: { slug: string }) {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    const match = location.hash.match(/(?:^#|&)delete=([^&]+)/);
    if (match) setToken(decodeURIComponent(match[1]));
  }, []);
  if (!token) return null;
  return <div className="wl-delete-panel"><p>You opened this report with its private management key.</p><button type="button" disabled={status === "deleting"} onClick={async () => {
    if (!confirm("Permanently delete this report? This cannot be undone.")) return;
    setStatus("deleting");
    const response = await fetch(`${API_URL}/v1/reports/${slug}`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ deleteToken: token }) });
    if (response.ok) { setStatus("deleted"); location.replace("/workflowlens"); }
    else setStatus("error");
  }}>{status === "deleting" ? "Deleting…" : "Delete this report"}</button>{status === "error" ? <span>Deletion failed. Check the management link.</span> : null}</div>;
}
