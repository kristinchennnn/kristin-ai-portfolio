"use client";

import { useState } from "react";

export function CopySummary({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button type="button" onClick={async () => {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2_000);
    }}>
      {copied ? "Copied" : "Copy executive summary"}
    </button>
  );
}
