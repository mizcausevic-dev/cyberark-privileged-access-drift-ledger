import fs from "node:fs";

const sql = fs.readFileSync("sql/privileged_access_contract.sql", "utf8");
const required = [
  "lane_id",
  "privileged_accounts",
  "vaulted_coverage_percent",
  "rotation_age_days",
  "checkout_policy_gap_count",
  "session_recording_coverage_percent"
];
const missing = required.filter((term) => !sql.includes(term));

if (missing.length) {
  throw new Error(`SQL contract missing fields: ${missing.join(", ")}`);
}

console.log("sql contract ok");
