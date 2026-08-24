import { z } from "zod";

export const recommendationCategories = [
  "Keep Human",
  "AI Assist",
  "Automate",
  "Redesign First",
  "Do Not Use AI",
] as const;

export const workflowStepSchema = z.object({
  id: z.string().min(1).max(80),
  name: z.string().min(2).max(160),
  owner: z.string().max(120).default("Not specified"),
  systems: z.array(z.string().max(80)).max(8).default([]),
  input: z.string().max(500).default(""),
  output: z.string().max(500).default(""),
  painPoint: z.string().max(500).default(""),
});

export const workflowInputSchema = z.object({
  name: z.string().min(3).max(120),
  team: z.string().min(2).max(120),
  industry: z.string().min(2).max(120),
  objective: z.string().min(10).max(600),
  owner: z.string().min(2).max(120),
  frequency: z.string().min(2).max(120),
  workflowText: z.string().min(80).max(32_000),
  priorities: z.array(z.string().max(80)).min(1).max(6),
  constraints: z.string().max(2_000).default(""),
  people: z.number().int().min(1).max(10_000),
  runsPerMonth: z.number().min(0.1).max(100_000),
  minutesPerRun: z.number().min(1).max(100_000),
  hourlyCost: z.number().min(0).max(10_000),
  expectedAdoption: z.number().min(0).max(100),
  implementationCost: z.number().min(0).max(10_000_000),
});

export const extractionSchema = z.object({
  summary: z.string().min(20).max(1_500),
  steps: z.array(workflowStepSchema).min(2).max(18),
  bottlenecks: z.array(z.string().max(400)).max(8),
  clarifyingQuestions: z.array(z.string().max(300)).max(3),
});

const scoreSchema = z.number().int().min(1).max(5);

export const analysisSchema = z.object({
  executiveSummary: z.string().min(80).max(2_500),
  frictionPoints: z.array(z.object({
    title: z.string().max(160),
    evidence: z.string().max(500),
    consequence: z.string().max(500),
  })).min(1).max(8),
  recommendations: z.array(z.object({
    stepId: z.string().max(80),
    category: z.enum(recommendationCategories),
    rationale: z.string().max(900),
    impact: scoreSchema,
    feasibility: scoreSchema,
    readiness: scoreSchema,
    risk: scoreSchema,
    changeEffort: scoreSchema,
    confidence: z.enum(["Low", "Medium", "High"]),
    humanCheckpoint: z.string().max(500),
    pilotAction: z.string().max(500),
  })).min(1).max(18),
  futureState: z.array(z.string().max(500)).min(2).max(12),
  humanControls: z.array(z.string().max(500)).min(1).max(10),
  risks: z.array(z.object({
    title: z.string().max(160),
    mitigation: z.string().max(700),
  })).min(1).max(8),
  roadmap: z.object({
    thirtyDays: z.array(z.string().max(400)).min(1).max(6),
    sixtyDays: z.array(z.string().max(400)).min(1).max(6),
    ninetyDays: z.array(z.string().max(400)).min(1).max(6),
  }),
  successMetrics: z.array(z.object({
    name: z.string().max(140),
    measure: z.string().max(400),
  })).min(2).max(10),
  limitations: z.array(z.string().max(500)).min(1).max(8),
});

export const roiSchema = z.object({
  assumptions: z.object({
    people: z.number(),
    runsPerMonth: z.number(),
    minutesPerRun: z.number(),
    hourlyCost: z.number(),
    expectedAdoption: z.number(),
    implementationCost: z.number(),
  }),
  scenarios: z.array(z.object({
    name: z.enum(["Conservative", "Expected", "Optimistic"]),
    timeReduction: z.number(),
    monthlyHoursSaved: z.number(),
    annualCapacityValue: z.number(),
    paybackMonths: z.number().nullable(),
  })),
});

export const workflowReportSchema = z.object({
  schemaVersion: z.literal("1.0"),
  reportId: z.string(),
  generatedAt: z.string(),
  expiresAt: z.string(),
  workflowProfile: workflowInputSchema.omit({ workflowText: true }),
  workflowSummary: z.string(),
  currentState: z.object({ steps: z.array(workflowStepSchema) }),
  executiveSummary: analysisSchema.shape.executiveSummary,
  frictionPoints: analysisSchema.shape.frictionPoints,
  recommendations: analysisSchema.shape.recommendations,
  futureState: analysisSchema.shape.futureState,
  humanControls: analysisSchema.shape.humanControls,
  risks: analysisSchema.shape.risks,
  roadmap: analysisSchema.shape.roadmap,
  successMetrics: analysisSchema.shape.successMetrics,
  roi: roiSchema,
  limitations: analysisSchema.shape.limitations,
});

export type WorkflowInput = z.infer<typeof workflowInputSchema>;
export type WorkflowStep = z.infer<typeof workflowStepSchema>;
export type WorkflowExtraction = z.infer<typeof extractionSchema>;
export type WorkflowAnalysis = z.infer<typeof analysisSchema>;
export type WorkflowReport = z.infer<typeof workflowReportSchema>;

export function calculateRoi(input: WorkflowInput): z.infer<typeof roiSchema> {
  const baseHours = input.people * input.runsPerMonth * input.minutesPerRun / 60;
  const adoption = input.expectedAdoption / 100;
  const reductions = [
    { name: "Conservative" as const, factor: 0.2 },
    { name: "Expected" as const, factor: 0.4 },
    { name: "Optimistic" as const, factor: 0.6 },
  ];

  return {
    assumptions: {
      people: input.people,
      runsPerMonth: input.runsPerMonth,
      minutesPerRun: input.minutesPerRun,
      hourlyCost: input.hourlyCost,
      expectedAdoption: input.expectedAdoption,
      implementationCost: input.implementationCost,
    },
    scenarios: reductions.map(({ name, factor }) => {
      const monthlyHoursSaved = baseHours * factor * adoption;
      const annualCapacityValue = monthlyHoursSaved * input.hourlyCost * 12;
      return {
        name,
        timeReduction: factor * 100,
        monthlyHoursSaved: Math.round(monthlyHoursSaved * 10) / 10,
        annualCapacityValue: Math.round(annualCapacityValue),
        paybackMonths: input.implementationCost > 0 && annualCapacityValue > 0
          ? Math.round((input.implementationCost / (annualCapacityValue / 12)) * 10) / 10
          : null,
      };
    }),
  };
}

const demoInput: WorkflowInput = {
  name: "Cross-channel campaign reporting",
  team: "Growth marketing",
  industry: "Media & entertainment",
  objective: "Produce a reliable weekly view of campaign performance and explain material changes to leadership.",
  owner: "Marketing analytics lead",
  frequency: "Weekly",
  workflowText: "Synthetic demonstration workflow.",
  priorities: ["Time savings", "Quality", "Decision speed"],
  constraints: "Source platforms use inconsistent naming and a human must approve performance narratives.",
  people: 2,
  runsPerMonth: 4,
  minutesPerRun: 360,
  hourlyCost: 55,
  expectedAdoption: 75,
  implementationCost: 6_000,
};

export const demoReport: WorkflowReport = {
  schemaVersion: "1.0",
  reportId: "demo-campaign-reporting",
  generatedAt: "2026-08-24T14:00:00.000Z",
  expiresAt: "2099-12-31T23:59:59.000Z",
  workflowProfile: (({ workflowText: _workflowText, ...profile }) => profile)(demoInput),
  workflowSummary: "A weekly reporting workflow that gathers cross-channel campaign data, standardizes metrics, validates anomalies, builds a narrative, and prepares a leadership update.",
  currentState: {
    steps: [
      { id: "collect", name: "Collect platform exports", owner: "Analyst", systems: ["Ad platforms", "Spreadsheets"], input: "Platform reports", output: "Raw exports", painPoint: "Manual downloads and inconsistent date ranges" },
      { id: "standardize", name: "Standardize campaign metrics", owner: "Analyst", systems: ["Spreadsheet"], input: "Raw exports", output: "Combined dataset", painPoint: "Naming and metric definitions vary by channel" },
      { id: "validate", name: "Validate anomalies and missing data", owner: "Analytics lead", systems: ["Spreadsheet", "Dashboards"], input: "Combined dataset", output: "Validated dataset", painPoint: "Checks rely on individual experience" },
      { id: "narrative", name: "Explain performance changes", owner: "Analytics lead", systems: ["Slides"], input: "Validated metrics", output: "Draft narrative", painPoint: "Repeated interpretation and formatting" },
      { id: "approve", name: "Approve leadership report", owner: "Marketing director", systems: ["Slides", "Email"], input: "Draft report", output: "Approved briefing", painPoint: "Late changes create rework" },
    ],
  },
  executiveSummary: "The strongest near-term opportunity is an AI-assisted reporting pipeline—not autonomous decision-making. Automate collection and normalization where rules are stable, use AI to draft anomaly explanations with traceable evidence, and preserve human approval for performance claims and budget decisions. Start with one channel and measure cycle time, correction rate, and analyst trust before expanding.",
  frictionPoints: [
    { title: "Fragmented inputs", evidence: "Campaign exports use different schemas and naming conventions.", consequence: "Analysts spend time assembling data before they can interpret it." },
    { title: "Tacit quality checks", evidence: "Anomaly validation depends on individual analyst experience.", consequence: "Review quality is difficult to repeat or delegate." },
    { title: "Narrative rework", evidence: "Leadership changes can require rebuilding charts and commentary.", consequence: "Late-stage edits lengthen the reporting cycle." },
  ],
  recommendations: [
    { stepId: "collect", category: "Automate", rationale: "Platform extraction is repetitive and rules-based when credentials and date windows are controlled.", impact: 5, feasibility: 4, readiness: 4, risk: 2, changeEffort: 3, confidence: "High", humanCheckpoint: "Alert an analyst when an export is missing or materially smaller than expected.", pilotAction: "Automate one platform export and log row counts for four reporting cycles." },
    { stepId: "standardize", category: "AI Assist", rationale: "Rules should perform known mappings; AI can propose mappings for new campaign names for analyst approval.", impact: 5, feasibility: 4, readiness: 3, risk: 3, changeEffort: 3, confidence: "High", humanCheckpoint: "Require approval for unseen mappings and metric-definition changes.", pilotAction: "Build a controlled mapping table with an exception queue." },
    { stepId: "validate", category: "AI Assist", rationale: "AI can prioritize anomalies and explain why a value was flagged, while a qualified analyst confirms material issues.", impact: 4, feasibility: 4, readiness: 3, risk: 3, changeEffort: 2, confidence: "Medium", humanCheckpoint: "Analyst confirms all anomalies that affect published conclusions.", pilotAction: "Compare suggested anomalies with the lead analyst’s review on historical reports." },
    { stepId: "narrative", category: "AI Assist", rationale: "A source-grounded first draft can reduce formatting work, but causality and business interpretation require judgment.", impact: 4, feasibility: 4, readiness: 3, risk: 4, changeEffort: 2, confidence: "High", humanCheckpoint: "Every claim must link to a validated metric and receive analyst approval.", pilotAction: "Generate draft commentary with evidence links for one weekly report." },
    { stepId: "approve", category: "Keep Human", rationale: "Publishing performance claims and budget implications carries accountability that should remain with the marketing director.", impact: 3, feasibility: 5, readiness: 5, risk: 5, changeEffort: 1, confidence: "High", humanCheckpoint: "Director signs off on the final report and any recommended budget change.", pilotAction: "Use a structured approval checklist instead of automating the decision." },
  ],
  futureState: [
    "Scheduled connectors collect channel data and record completeness checks.",
    "A rules-first normalization layer applies approved metric and naming mappings.",
    "AI triages exceptions and drafts evidence-linked observations.",
    "An analyst validates anomalies, causality, and the reporting narrative.",
    "The marketing director approves publication and material budget decisions.",
  ],
  humanControls: [
    "Require approval for every new data mapping.",
    "Keep source values visible beside AI-generated explanations.",
    "Block publication when required feeds are missing.",
    "Record who approved each report and material change.",
  ],
  risks: [
    { title: "Confident but unsupported explanations", mitigation: "Constrain narratives to validated metrics and require an evidence link for every material claim." },
    { title: "Metric-definition drift", mitigation: "Version the mapping table and route unseen definitions to a human exception queue." },
    { title: "Automation hides missing data", mitigation: "Use hard completeness thresholds and fail closed when required sources are absent." },
  ],
  roadmap: {
    thirtyDays: ["Document metric definitions and exception rules.", "Baseline reporting time and correction rates.", "Prototype one automated channel import."],
    sixtyDays: ["Add rules-first normalization and exception review.", "Test evidence-linked narrative drafting on historical reports.", "Run parallel human and assisted workflows."],
    ninetyDays: ["Launch a controlled weekly pilot.", "Review quality, trust, and adoption metrics.", "Decide whether to expand to additional channels."],
  },
  successMetrics: [
    { name: "Cycle time", measure: "Median hours from data availability to approved report." },
    { name: "Correction rate", measure: "Material data or narrative corrections per report." },
    { name: "Evidence coverage", measure: "Share of published claims linked to validated source metrics." },
    { name: "Analyst adoption", measure: "Share of reports completed through the assisted workflow." },
  ],
  roi: calculateRoi(demoInput),
  limitations: [
    "This demonstration uses synthetic inputs and does not represent a client deployment.",
    "The ROI scenario measures potential capacity value, not guaranteed cash savings.",
    "Integration feasibility depends on platform APIs, data rights, and the organization’s control environment.",
  ],
};

export function withoutSourceText(input: WorkflowInput) {
  const { workflowText: _workflowText, ...profile } = input;
  return profile;
}
