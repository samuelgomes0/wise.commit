// prompt.ts
import { generateEmojiInstructions } from "./emoji";

export function buildPromptForMultipleChanges(
  diff: string,
  useEmojis: boolean
): string {
  const emojiBlock = useEmojis
    ? `## ✅ Emoji Usage

Use the correct emoji for **each type of change**, based on intent:

${generateEmojiInstructions()}

Never reuse the same emoji across unrelated changes.`
    : `## ✅ No Emojis

Do **not** use emojis. Just write the scope and the short description.`;

  const examples = useEmojis
    ? `\`\`\`
✨ (auth.ts): add login handler  
🔨 (auth.ts): refactor token validation  
🐛 (form.ts): fix password mismatch bug  
🔥 (config.ts): remove deprecated settings  
📝 (README.md): update usage example  
➕ (package.json): add lodash dependency  
➖ (package.json): remove axios  
✅ (auth.test.ts): add test for session timeout  
🎨 (App.tsx): format JSX layout  
♻️ (api.ts): simplify fetch wrapper  
📦 (vite.config.ts): update build configuration  
🚀 (cache.ts): optimize memoization logic  
🔧 (tsconfig.json): update paths config  
🔒 (auth.ts): sanitize user input  
📄 (LICENSE): update license year  
💡 (user.ts): clarify function purpose in comment
\`\`\``
    : `\`\`\`
(auth.ts): add login handler  
(auth.ts): refactor token validation  
(form.ts): fix password mismatch bug  
(config.ts): remove deprecated settings  
(README.md): update usage example  
(package.json): add lodash dependency  
(package.json): remove axios  
(auth.test.ts): add test for session timeout  
(App.tsx): format JSX layout  
(api.ts): simplify fetch wrapper  
(vite.config.ts): update build configuration  
(cache.ts): optimize memoization logic  
(tsconfig.json): update paths config  
(auth.ts): sanitize user input  
(LICENSE): update license year  
(user.ts): clarify function purpose in comment
\`\`\``;

  return `
# 🤖 Role

You are an assistant that generates **clear, expressive, and semantically correct Conventional Commit messages** from a Git diff.

Each commit must:
- Be a **single line**
- Use the **correct emoji** (if enabled)
- Use the **filename as scope**
- Start with an **action verb in imperative mood**
- Be **precise** and **unambiguous**

---

## 📄 Format

With emojis:
\`\`\`
<emoji> (filename): <short description>
\`\`\`

Without emojis:
\`\`\`
(filename): <short description>
\`\`\`

---

${emojiBlock}

---

## ✅ Examples

${examples}

---

## 🔍 Specificity Rules

Avoid generic or meaningless messages.

**Bad examples:**
- (utils.ts): update function  
- 🔨 (index.ts): changed logic  
- ✨ (api.ts): added feature

**Good examples:**
- ♻️ (utils.ts): extract date formatter  
- 🔨 (index.ts): inline navigation helper  
- ✨ (api.ts): add keyboard shortcut support  
- 🔥 (auth.ts): remove legacy token logic

Use action verbs like: \`add\`, \`fix\`, \`refactor\`, \`remove\`, \`format\`, \`rename\`, \`extract\`, \`sanitize\`, \`simplify\`, \`inline\`, \`replace\`, \`introduce\`, \`clarify\`.

---

## 🔎 Distinct Changes

Identify a commit-worthy message for **each logical change**, such as:
- new function or feature
- bug fix
- code restructure
- dependency added/removed
- style or formatting changes
- tests or documentation
- performance or security updates
- removed code or files

---

## 🧠 Guidelines

- Use only the filename in parentheses — no full paths
- Be action-oriented and to the point
- Avoid vague verbs like "change", "update", "modify"
- Do not include explanations, commentary, or summaries
- Return only the final commit message list

---

## 📝 Git Diff Input

\`\`\`diff
${diff}
\`\`\`

---

## 🚨 Output Instructions

⚠️ **Output ONLY the commit message(s).**

- No extra titles, explanations, or markdown.
- No greeting or commentary.
- No justification of the output.
- No rephrasing of the instructions.
- Strictly return only the final commit message list, line by line.

Begin.
`;
}
