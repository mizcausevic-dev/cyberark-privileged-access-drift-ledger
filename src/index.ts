export interface PrivilegedAccessLane {
  laneId: string;
  segment: string;
  privilegedAccounts: number;
  vaultedCoveragePercent: number;
  rotationAgeDays: number;
  checkoutPolicyGapCount: number;
  unreviewedBreakGlassAccounts: number;
  staleOwnerCount: number;
  sessionRecordingCoveragePercent: number;
  owner: string;
  nextAction: string;
}

export interface DriftInput {
  asOf: string;
  estate: string;
  lanes: PrivilegedAccessLane[];
}

export interface DriftFinding extends PrivilegedAccessLane {
  driftScore: number;
  exposedAccountsEstimate: number;
  posture: "contained" | "watch" | "escalate";
  boardNarrative: string;
}

export interface DriftSummary {
  asOf: string;
  estate: string;
  aggregateDriftScore: number;
  escalationLanes: number;
  exposedAccountsEstimate: number;
  findings: DriftFinding[];
  primaryRecommendation: string;
}

const clamp = (value: number): number => Math.max(0, Math.min(100, value));
const round = (value: number, places = 2): number => {
  const scale = 10 ** places;
  return Math.round(value * scale) / scale;
};

export function scoreLane(lane: PrivilegedAccessLane): DriftFinding {
  const exposedAccountsEstimate = Math.ceil(lane.privilegedAccounts * Math.max(0, 100 - lane.vaultedCoveragePercent) / 100);
  const driftScore = round(
    clamp(
      Math.max(0, 98 - lane.vaultedCoveragePercent) * 2.1 +
        lane.rotationAgeDays * 0.55 +
        lane.checkoutPolicyGapCount * 8 +
        lane.unreviewedBreakGlassAccounts * 9.5 +
        lane.staleOwnerCount * 4.5 +
        Math.max(0, 95 - lane.sessionRecordingCoveragePercent) * 1.2
    )
  );
  const posture = driftScore >= 68 ? "escalate" : driftScore >= 34 ? "watch" : "contained";
  const boardNarrative =
    posture === "escalate"
      ? `${lane.laneId} needs privileged-access remediation before access review findings become board exposure.`
      : posture === "watch"
        ? `${lane.laneId} is controlled enough to operate but still needs owner-visible PAM evidence.`
        : `${lane.laneId} is contained with usable vaulting, rotation, checkout, and recording proof.`;

  return { ...lane, driftScore, exposedAccountsEstimate, posture, boardNarrative };
}

export function buildDriftSummary(input: DriftInput): DriftSummary {
  if (!input.lanes.length) {
    throw new Error("At least one privileged access lane is required.");
  }
  const findings = input.lanes.map(scoreLane).sort((a, b) => b.driftScore - a.driftScore);
  const aggregateDriftScore = round(findings.reduce((sum, lane) => sum + lane.driftScore, 0) / findings.length);
  const escalationLanes = findings.filter((lane) => lane.posture === "escalate").length;
  const exposedAccountsEstimate = findings.reduce((sum, lane) => sum + lane.exposedAccountsEstimate, 0);
  const top = findings[0];

  return {
    asOf: input.asOf,
    estate: input.estate,
    aggregateDriftScore,
    escalationLanes,
    exposedAccountsEstimate,
    findings,
    primaryRecommendation: `${top.laneId}: ${top.nextAction}`
  };
}
