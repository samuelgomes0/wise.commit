import eslintPluginTs from "@typescript-eslint/eslint-plugin";
import parserTs from "@typescript-eslint/parser";

/** @type {import("eslint").Linter.FlatConfig} */
export default [
  {
    ignores: ["node_modules/**", "dist/**"],
    files: ["**/*.ts"],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": eslintPluginTs
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-var": "error",
      "prefer-const": "error",
      "no-unused-vars": "error",
      indent: ["error", 2]
    }
  }
];
