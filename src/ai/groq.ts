import fetch from "node-fetch";

interface GroqCompletionResponse {
  choices: { message: { content: string } }[];
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateCommitMessagesWithGroq(
  prompt: string,
  apiKey: string
): Promise<string> {
  if (!apiKey) {
    console.error("🚫 Groq API key is required but was not provided.");
    process.exit(1);
  }

  const apiUrl = "https://api.groq.com/openai/v1/chat/completions";

  const payload = {
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that generates concise and meaningful Conventional Commit messages based on git diffs.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.2,
    max_tokens: 100000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  const MAX_RETRIES = 5;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 429) {
        const errorBody = (await response.json()) as {
          error?: { message?: string };
        };
        const retryMs = 500; // Default retry time

        console.warn(
          `⚠️ Rate limit hit: ${
            errorBody.error?.message ?? "Unknown error"
          }. Retrying in ${retryMs}ms...`
        );

        await sleep(retryMs);
        continue;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `❌ Groq API error: ${response.status} ${response.statusText}`
        );
        console.error(`Details: ${errorText}`);
        process.exit(1);
      }

      const data = (await response.json()) as GroqCompletionResponse;

      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error("❌ Failed to fetch from Groq API:", error);
      if (attempt < MAX_RETRIES - 1) {
        console.log(`Retrying... (${attempt + 1}/${MAX_RETRIES})`);
        await sleep(500);
      } else {
        console.error("❌ Max retries reached. Exiting.");
        process.exit(1);
      }
    }
  }

  console.error("❌ Could not complete the request after retries.");
  process.exit(1);
}
