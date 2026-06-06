import fs from "node:fs";

const html = fs.readFileSync("site/index.html", "utf8");
const markers = [
  "CyberArk Privileged Access Drift Ledger",
  "Privileged access drift becomes visible before audit turns into board exposure",
  "domain-admin-safe",
  "cloud-root-access"
];
const missing = markers.filter((marker) => !html.includes(marker));

if (missing.length) {
  throw new Error(`Missing prerender markers: ${missing.join(", ")}`);
}

console.log("smoke ok");
