import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.ts"],
    exclude: ["dist/**", "site/**", "coverage/**", "node_modules/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary"],
      thresholds: { lines: 90, functions: 90, branches: 80, statements: 90 }
    }
  }
});
