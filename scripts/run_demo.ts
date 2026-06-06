import fs from "node:fs";
import { buildDriftSummary, type DriftInput } from "../src/index.js";

const input = JSON.parse(fs.readFileSync("fixtures/privileged-access-drift.json", "utf8")) as DriftInput;
const summary = buildDriftSummary(input);

console.log(`estate=${summary.estate}`);
console.log(`drift=${summary.aggregateDriftScore}`);
console.log(`escalation=${summary.escalationLanes}`);
console.log(`exposed=${summary.exposedAccountsEstimate}`);
console.log(`recommendation=${summary.primaryRecommendation}`);
