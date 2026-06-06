import { describe, expect, it } from "vitest";
import fixture from "../fixtures/privileged-access-drift.json" with { type: "json" };
import { buildDriftSummary, scoreLane, type DriftInput, type PrivilegedAccessLane } from "../src/index.js";

describe("cyberark privileged access drift ledger", () => {
  it("prioritizes the lane with highest privileged-access drift", () => {
    const summary = buildDriftSummary(fixture as DriftInput);
    expect(summary.escalationLanes).toBe(1);
    expect(summary.findings[0].laneId).toBe("domain-admin-safe");
    expect(summary.primaryRecommendation).toContain("Rotate high-impact domain admin accounts");
  });

  it("keeps contained DBA safe below watch threshold", () => {
    const finding = scoreLane((fixture as DriftInput).lanes[2]);
    expect(finding.posture).toBe("contained");
    expect(finding.exposedAccountsEstimate).toBe(1);
  });

  it("marks moderate cloud root access as watch", () => {
    const finding = scoreLane((fixture as DriftInput).lanes[1]);
    expect(finding.posture).toBe("watch");
  });

  it("requires at least one privileged access lane", () => {
    expect(() => buildDriftSummary({ asOf: "2026-06-06T10:00:00Z", estate: "empty", lanes: [] })).toThrow(
      "At least one privileged access lane is required."
    );
  });

  it("keeps a fully controlled safe contained", () => {
    const lane: PrivilegedAccessLane = {
      laneId: "network-admin-safe",
      segment: "Network administration",
      privilegedAccounts: 12,
      vaultedCoveragePercent: 99,
      rotationAgeDays: 5,
      checkoutPolicyGapCount: 0,
      unreviewedBreakGlassAccounts: 0,
      staleOwnerCount: 0,
      sessionRecordingCoveragePercent: 98,
      owner: "Network security",
      nextAction: "Keep evidence attached."
    };
    expect(scoreLane(lane).posture).toBe("contained");
  });
});
