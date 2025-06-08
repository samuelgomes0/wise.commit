import Groq from "groq-sdk";

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
          "You are a helpful assistant that generates concise and meaningful Conventional Commit messages based on git diffs."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7
  });

  return choices[0].message.content.trim();
}

export default generateCommitMessageWithGroq;
