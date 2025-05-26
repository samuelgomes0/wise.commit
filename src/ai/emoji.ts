export const emojiMap: Record<string, string> = {
  feat: "✨",
  fix: "🐛",
  docs: "📝",
  style: "🎨",
  refactor: "🔨",
  perf: "🚀",
  test: "✅",
  build: "📦",
  chore: "🔧",
  revert: "⏪",
  ci: "⚡",
  security: "🔒",
  release: "🔖",
  lint: "🚨",
  "fix-ci": "💚",
  "build-system": "👷",
  license: "📄",
  comment: "💡",
  remove: "🗑️",
  recycle: "♻️",
  add: "➕",
  "remove-deps": "➖",
  merge: "🔀",
};

function describeScope(type: string): string {
  const descriptions: Record<string, string> = {
    feat: "New feature",
    fix: "Bug fix",
    docs: "Documentation",
    style: "Code style changes",
    refactor: "Code refactoring",
    perf: "Performance improvement",
    test: "Adding or modifying tests",
    build: "Build system changes",
    chore: "Maintenance tasks",
    revert: "Reverting commits",
    ci: "Continuous Integration",
    security: "Security fixes",
    release: "Release creation",
    lint: "Linter fixes",
    "fix-ci": "CI build fixes",
    "build-system": "Build system changes",
    license: "License updates",
    comment: "Code comments",
    remove: "Code or file removal",
    recycle: "Code reuse or rewriting",
    add: "Adding dependencies or files",
    "remove-deps": "Removing dependencies",
    merge: "Merging branches",
  };

  return descriptions[type] || "No description";
}

export function generateEmojiInstructions(): string {
  return Object.entries(emojiMap)
    .map(([type, emoji]) => `${emoji} ${type}: ${describeScope(type)}`)
    .join("\n");
}
