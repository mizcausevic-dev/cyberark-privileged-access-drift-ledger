import fs from "node:fs";
import { renderApp } from "../src/app.js";
import type { DriftInput } from "../src/index.js";

const input = JSON.parse(fs.readFileSync("fixtures/privileged-access-drift.json", "utf8")) as DriftInput;
fs.mkdirSync("site", { recursive: true });
fs.writeFileSync("site/index.html", renderApp(input));
