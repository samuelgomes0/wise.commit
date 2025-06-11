// groq.ts
import Groq from "groq-sdk";

function extractValidCommitMessages(text: string): string[] {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => {
      // Valid formats (with or without emojis):
      return /^(([\p{Emoji_Presentation}\p{Emoji}\u200d]+ )?\([^)]+\): .+)/u.test(
        line
      );
    });

  return lines;
}

async function generateCommitMessageWithGroq(
  apiKey: string,
  prompt: string
): Promise<string> {
  if (!apiKey) {
    console.error("🚫 Groq API key is required but was not provided.");
    process.exit(1);
  }

  const groq = new Groq({ apiKey });

  const { choices } = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that generates concise and meaningful Conventional Commit messages based on git diffs. Only respond with commit messages, one per line."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7
  });

  const rawOutput = choices[0].message.content.trim();
  const messages = extractValidCommitMessages(rawOutput);

  if (messages.length === 0) {
    throw new Error(
      "🚫 No valid commit messages were extracted from the response."
    );
  }

  return messages.join("\n");
}

export default generateCommitMessageWithGroq;
