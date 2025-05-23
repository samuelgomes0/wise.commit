import { generateEmojiInstructions } from "./emoji";

export function buildPromptForMultipleChanges(
  diff: string,
  useEmojis: boolean
): string {
  const emojiInstruction = useEmojis
    ? `Use the following emojis for each type of change:\n\n${generateEmojiInstructions()}\n\nStart each message with the appropriate emoji and scope, like this:\n\n✨ (package.json): initialize package metadata\n🔨 (index.ts): refactor entry point`
    : "Do NOT use any emojis.";

  return `
You are an AI assistant that helps software developers write concise and meaningful Git commit messages.

Based on the following diff, generate a **list of concise commit messages**, each one summarizing a distinct feature, improvement, or module affected.

**Use this format:**

\`\`\`
✨ (package.json): initialize package metadata
🔨 (index.ts): refactor entry point
\`\`\`

**Guidelines:**

- One line per change.
- Use parenthesis to indicate only the **name of the file**, without any directory path.
- Do not include subdirectories or full file paths.
- Keep it short and descriptive.
- ${emojiInstruction}

Here is the diff:

${diff}

Generate only the list of commit messages as described above, no explanations.
`;
}
