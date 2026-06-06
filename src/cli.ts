import fs from "node:fs";
import { buildDriftSummary, type DriftInput } from "./index.js";

const inputPath = process.argv[2] ?? "fixtures/privileged-access-drift.json";
const format = process.argv.includes("--format=json") ? "json" : "text";
const input = JSON.parse(fs.readFileSync(inputPath, "utf8")) as DriftInput;
const summary = buildDriftSummary(input);

if (format === "json") {
  console.log(JSON.stringify(summary, null, 2));
} else {
  console.log(`estate=${summary.estate}`);
  console.log(`drift=${summary.aggregateDriftScore}`);
  console.log(`escalation=${summary.escalationLanes}`);
  console.log(`exposed=${summary.exposedAccountsEstimate}`);
  console.log(`recommendation=${summary.primaryRecommendation}`);
}
