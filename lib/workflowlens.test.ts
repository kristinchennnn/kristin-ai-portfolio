import { describe, expect, it } from "vitest";
import { calculateRoi, demoReport, workflowReportSchema, type WorkflowInput } from "./workflowlens";

const input: WorkflowInput = {
  name: "Weekly reporting workflow",
  team: "Marketing analytics",
  industry: "Media",
  objective: "Produce a reliable weekly performance briefing for leadership.",
  owner: "Analytics lead",
  frequency: "Weekly",
  workflowText: "Collect exports, normalize campaign names, validate anomalies, draft commentary, and obtain director approval before publishing.",
  priorities: ["Time savings", "Quality"],
  constraints: "A human must approve the final narrative.",
  people: 2,
  runsPerMonth: 4,
  minutesPerRun: 360,
  hourlyCost: 55,
  expectedAdoption: 75,
  implementationCost: 6_000,
};

describe("WorkflowLens report contracts", () => {
  it("keeps the published demo inside the report schema", () => {
    expect(workflowReportSchema.safeParse(demoReport).success).toBe(true);
    expect("workflowText" in demoReport.workflowProfile).toBe(false);
  });

  it("calculates deterministic capacity scenarios", () => {
    expect(calculateRoi(input).scenarios).toEqual([
      { name: "Conservative", timeReduction: 20, monthlyHoursSaved: 7.2, annualCapacityValue: 4_752, paybackMonths: 15.2 },
      { name: "Expected", timeReduction: 40, monthlyHoursSaved: 14.4, annualCapacityValue: 9_504, paybackMonths: 7.6 },
      { name: "Optimistic", timeReduction: 60, monthlyHoursSaved: 21.6, annualCapacityValue: 14_256, paybackMonths: 5.1 },
    ]);
  });
});
