export function inferTypeFromFile(file: string): string {
  if (file.endsWith(".json")) return "build";
  if (file.includes("config")) return "chore";
  if (file.includes(".gitignore")) return "chore";
  if (file.includes("test") || file.includes("__tests__")) return "test";
  if (file.includes("README")) return "docs";

  return "feat";
}
