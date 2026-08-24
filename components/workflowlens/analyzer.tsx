"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ReportView } from "@/components/workflowlens/report-view";
import { Turnstile, type TurnstileHandle } from "@/components/workflowlens/turnstile";
import { extractWorkflowFiles } from "@/lib/document-extractor";
import {
  extractionSchema,
  workflowInputSchema,
  workflowReportSchema,
  type WorkflowExtraction,
  type WorkflowInput,
  type WorkflowReport,
} from "@/lib/workflowlens";

const API_URL = process.env.NEXT_PUBLIC_WORKFLOWLENS_API_URL ?? "https://workflowlens-api.kristinzhiyingchen.com";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? (process.env.NODE_ENV === "development" ? "1x00000000000000000000AA" : "");

const defaultInput: WorkflowInput = {
  name: "",
  team: "",
  industry: "",
  objective: "",
  owner: "",
  frequency: "Weekly",
  workflowText: "",
  priorities: ["Time savings", "Quality"],
  constraints: "",
  people: 1,
  runsPerMonth: 4,
  minutesPerRun: 120,
  hourlyCost: 55,
  expectedAdoption: 70,
  implementationCost: 5_000,
};

const priorityOptions = ["Time savings", "Cost reduction", "Quality", "Customer experience", "Risk reduction", "Employee experience"];

type ApiError = { error?: { code?: string; message?: string } };

async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json() as T & ApiError;
  if (!response.ok) throw new Error(data.error?.message ?? "The analysis service could not complete this request.");
  return data;
}

export function WorkflowAnalyzer() {
  const [stage, setStage] = useState(0);
  const [input, setInput] = useState<WorkflowInput>(defaultInput);
  const [files, setFiles] = useState<File[]>([]);
  const [extraction, setExtraction] = useState<WorkflowExtraction | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [run, setRun] = useState<{ runId: string; runToken: string } | null>(null);
  const [report, setReport] = useState<WorkflowReport | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [manageToken, setManageToken] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const turnstileRef = useRef<TurnstileHandle>(null);

  const update = <K extends keyof WorkflowInput>(key: K, value: WorkflowInput[K]) => setInput((current) => ({ ...current, [key]: value }));
  const onToken = useCallback((token: string) => setTurnstileToken(token), []);
  const onExpire = useCallback(() => setTurnstileToken(""), []);
  const progress = useMemo(() => Math.min(100, ((stage + 1) / 5) * 100), [stage]);

  const validateStage = () => {
    if (stage === 0 && (!input.name || !input.team || !input.industry || input.objective.length < 10 || !input.owner)) {
      setError("Complete the workflow name, team, industry, owner, and objective."); return false;
    }
    if (stage === 1 && input.workflowText.length < 80 && files.length === 0) {
      setError("Describe the current process in at least 80 characters or add a document."); return false;
    }
    setError(""); return true;
  };

  const next = () => { if (validateStage()) setStage((value) => Math.min(2, value + 1)); };

  const beginExtraction = async () => {
    setError("");
    if (!TURNSTILE_SITE_KEY) { setError("Live analysis is being configured. Explore the full demo in the meantime."); return; }
    if (!turnstileToken) { setError("Complete the security check before starting the live analysis."); return; }
    setBusy(true);
    try {
      const documentText = files.length ? await extractWorkflowFiles(files) : "";
      const combinedInput = { ...input, workflowText: `${input.workflowText}\n\n${documentText}`.trim().slice(0, 32_000) };
      const parsed = workflowInputSchema.parse(combinedInput);
      const result = await apiPost<{ runId: string; runToken: string; extraction: WorkflowExtraction }>("/v1/extract", {
        turnstileToken,
        input: parsed,
      });
      setInput(parsed);
      setRun({ runId: result.runId, runToken: result.runToken });
      setExtraction(extractionSchema.parse(result.extraction));
      setAnswers(result.extraction.clarifyingQuestions.map(() => ""));
      setStage(3);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not read this workflow.");
    } finally {
      setBusy(false);
      setTurnstileToken("");
      turnstileRef.current?.reset();
    }
  };

  const finishAnalysis = async () => {
    if (!run || !extraction) return;
    setBusy(true); setError("");
    try {
      const result = await apiPost<{ report: WorkflowReport; slug: string; manageToken: string }>("/v1/analyze", {
        ...run,
        input,
        extraction,
        clarificationAnswers: extraction.clarifyingQuestions.map((question, index) => ({ question, answer: answers[index] ?? "" })),
      });
      setReport(workflowReportSchema.parse(result.report));
      setSlug(result.slug);
      setManageToken(result.manageToken);
      setStage(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The final report could not be completed.");
    } finally { setBusy(false); }
  };

  if (stage === 4 && report) {
    const sharePath = slug ? `/workflowlens/report/${slug}` : undefined;
    return (
      <div className="wl-analyzer-result">
        <div className="wl-result-actions wl-shell">
          <div><p className="wl-kicker">Your assessment is ready</p><h2>Save the links before you leave.</h2></div>
          <div>
            {sharePath ? <Link className="wl-button wl-button-dark" href={sharePath}>Open shareable report ↗</Link> : null}
            {sharePath && manageToken ? <button type="button" onClick={async () => navigator.clipboard.writeText(`${location.origin}${sharePath}#delete=${manageToken}`)}>Copy management link</button> : null}
          </div>
        </div>
        <div className="wl-shell"><ReportView report={report} exportBase={sharePath} /></div>
      </div>
    );
  }

  return (
    <div className="wl-analyzer wl-shell">
      <aside className="wl-analyzer-aside">
        <p className="wl-kicker">Live AI assessment</p>
        <h1>Map the work.<br /><em>Find the useful AI.</em></h1>
        <p>One analysis per visitor per day. Your documents are read in this browser and are never uploaded or stored.</p>
        <div className="wl-progress"><span style={{ width: `${progress}%` }} /></div>
        <small>Step {stage + 1} of 5</small>
        <Link className="wl-text-link" href="/workflowlens/demo">Prefer to look around first? View the demo ↗</Link>
      </aside>

      <section className="wl-wizard" aria-live="polite">
        {stage === 0 ? <>
          <div className="wl-form-heading"><span>01</span><div><h2>Set the context</h2><p>Tell us what the workflow is trying to accomplish.</p></div></div>
          <div className="wl-form-grid">
            <label className="wide">Workflow name<input value={input.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Weekly campaign reporting" /></label>
            <label>Team or function<input value={input.team} onChange={(e) => update("team", e.target.value)} placeholder="Growth marketing" /></label>
            <label>Industry<input value={input.industry} onChange={(e) => update("industry", e.target.value)} placeholder="Media & entertainment" /></label>
            <label>Workflow owner<input value={input.owner} onChange={(e) => update("owner", e.target.value)} placeholder="Analytics lead" /></label>
            <label>Frequency<input value={input.frequency} onChange={(e) => update("frequency", e.target.value)} placeholder="Weekly" /></label>
            <label className="wide">Objective<textarea value={input.objective} onChange={(e) => update("objective", e.target.value)} placeholder="What decision or outcome should this workflow support?" /></label>
          </div>
        </> : null}

        {stage === 1 ? <>
          <div className="wl-form-heading"><span>02</span><div><h2>Describe the current process</h2><p>Write it naturally. Imperfect notes are useful.</p></div></div>
          <label className="wl-block-label">Workflow notes<textarea className="wl-large-textarea" value={input.workflowText} onChange={(e) => update("workflowText", e.target.value)} placeholder="First we export data from... Then the analyst... The main delay is..." /></label>
          <label className="wl-file-zone">
            <input type="file" multiple accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain" onChange={(e) => setFiles(Array.from(e.target.files ?? []).slice(0, 3))} />
            <span>Add supporting documents</span><small>PDF, DOCX, or TXT · up to 3 files · processed in your browser</small>
          </label>
          {files.length ? <ul className="wl-file-list">{files.map((file) => <li key={file.name}>{file.name}<span>{(file.size / 1024 / 1024).toFixed(1)} MB</span></li>)}</ul> : null}
          <div className="wl-privacy-note"><strong>Keep sensitive information out.</strong> Do not include personal, regulated, client-confidential, or credential data.</div>
        </> : null}

        {stage === 2 ? <>
          <div className="wl-form-heading"><span>03</span><div><h2>Define value and constraints</h2><p>The ROI will use only the assumptions you provide.</p></div></div>
          <fieldset className="wl-priorities"><legend>What matters most?</legend>{priorityOptions.map((option) => <label key={option}><input type="checkbox" checked={input.priorities.includes(option)} onChange={(e) => update("priorities", e.target.checked ? [...input.priorities, option] : input.priorities.filter((item) => item !== option))} />{option}</label>)}</fieldset>
          <label className="wl-block-label">Constraints<textarea value={input.constraints} onChange={(e) => update("constraints", e.target.value)} placeholder="Approvals, sensitive data, technology limits, or non-negotiables" /></label>
          <div className="wl-number-grid">
            <label>People involved<input type="number" min="1" value={input.people} onChange={(e) => update("people", Number(e.target.value))} /></label>
            <label>Runs per month<input type="number" min="0.1" step="0.1" value={input.runsPerMonth} onChange={(e) => update("runsPerMonth", Number(e.target.value))} /></label>
            <label>Minutes per run<input type="number" min="1" value={input.minutesPerRun} onChange={(e) => update("minutesPerRun", Number(e.target.value))} /></label>
            <label>Hourly cost (CAD)<input type="number" min="0" value={input.hourlyCost} onChange={(e) => update("hourlyCost", Number(e.target.value))} /></label>
            <label>Expected adoption (%)<input type="number" min="0" max="100" value={input.expectedAdoption} onChange={(e) => update("expectedAdoption", Number(e.target.value))} /></label>
            <label>Implementation cost<input type="number" min="0" value={input.implementationCost} onChange={(e) => update("implementationCost", Number(e.target.value))} /></label>
          </div>
          <div className="wl-security-check"><Turnstile ref={turnstileRef} siteKey={TURNSTILE_SITE_KEY || "1x00000000000000000000AA"} onToken={onToken} onExpire={onExpire} /></div>
        </> : null}

        {stage === 3 && extraction ? <>
          <div className="wl-form-heading"><span>04</span><div><h2>Review the extracted workflow</h2><p>Correct the AI before it makes recommendations.</p></div></div>
          <p className="wl-extraction-summary">{extraction.summary}</p>
          <div className="wl-edit-steps">{extraction.steps.map((step, index) => <div key={step.id}><span>{String(index + 1).padStart(2, "0")}</span><input aria-label={`Step ${index + 1} name`} value={step.name} onChange={(e) => setExtraction({ ...extraction, steps: extraction.steps.map((item, itemIndex) => itemIndex === index ? { ...item, name: e.target.value } : item) })} /><input aria-label={`Step ${index + 1} owner`} value={step.owner} onChange={(e) => setExtraction({ ...extraction, steps: extraction.steps.map((item, itemIndex) => itemIndex === index ? { ...item, owner: e.target.value } : item) })} /></div>)}</div>
          {extraction.clarifyingQuestions.map((question, index) => <label className="wl-block-label" key={question}>{question}<textarea value={answers[index] ?? ""} onChange={(e) => setAnswers((current) => current.map((answer, answerIndex) => answerIndex === index ? e.target.value : answer))} /></label>)}
        </> : null}

        {error ? <div className="wl-error" role="alert">{error}</div> : null}
        <div className="wl-wizard-actions">
          {stage > 0 && stage < 3 ? <button type="button" className="wl-text-button" onClick={() => setStage((value) => value - 1)}>← Back</button> : <span />}
          {stage < 2 ? <button type="button" className="wl-button wl-button-dark" onClick={next}>Continue →</button> : null}
          {stage === 2 ? <button type="button" className="wl-button wl-button-dark" disabled={busy} onClick={beginExtraction}>{busy ? "Reading workflow…" : "Map my workflow →"}</button> : null}
          {stage === 3 ? <button type="button" className="wl-button wl-button-dark" disabled={busy} onClick={finishAnalysis}>{busy ? "Building assessment…" : "Build the assessment →"}</button> : null}
        </div>
      </section>
    </div>
  );
}
