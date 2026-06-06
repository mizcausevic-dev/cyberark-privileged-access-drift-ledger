import js from "@eslint/js";
import { globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default [
  globalIgnores(["dist/**", "site/**", "coverage/**"]),
  js.configs.recommended,
  ...tseslint.configs.recommended
];
