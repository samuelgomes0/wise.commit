#!/usr/bin/env node

import { execSync } from "child_process";
import { Command } from "commander";
import * as readline from "readline";
import generateCommitMessageWithGroq from "./ai/groq";
import { buildPromptForMultipleChanges } from "./ai/prompt";
import { loadConfig, saveConfig } from "./config/wisecommitConfig";
import { getStagedFiles, hasStagedFiles, isGitRepo } from "./git/commitGen";
import { validateApiKey } from "./utils/validateApiKey";

const program = new Command();

function truncatePrompt(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  console.warn("⚠️ Prompt truncado para evitar erro 413.");
  return text.slice(0, maxLength) + "\n\n[...truncated...]";
}

function askUserConfirmation(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${question} (y/n): `, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase() === "y");
    });
  });
}

program
  .name("wisecommit")
  .description(
    "Automated Conventional Commit message generator based on file list"
  )
  .version("1.1.0")
  .option(
    "-c, --commit",
    "Automatically create git commit with generated messages"
  )
  .option(
    "--emojis <boolean>",
    "Include emojis in commit messages (true/false)"
  )
  .option("--api-key <key>", "Set your Groq API Key");

program
  .command("config")
  .description("Show current wisecommit configuration")
  .action(() => {
    const config = loadConfig();
    console.log("⚙️ Current configuration:\n");
    console.log(JSON.stringify(config, null, 2));
  });

program.action(async (options) => {
  const config = loadConfig();

  const useEmojis =
    options.emojis !== undefined
      ? options.emojis === "true"
      : config.emojis ?? false;

  const apiKey = options.apiKey || config.apiKey;

  const updatedConfig = {
    emojis: useEmojis,
    lang: config.lang ?? "en",
    apiKey,
  };

  const isConfigChange =
    options.emojis !== undefined || options.apiKey !== undefined;

  if (isConfigChange) {
    saveConfig(updatedConfig);
    console.log("✅ Configuration updated.");
    return;
  }

  if (!(await isGitRepo())) {
    console.log("🚫 No Git repository detected in this directory.");
    process.exit(0);
  }

  if (!validateApiKey(apiKey)) {
    process.exit(1);
  }

  const hasFiles = await hasStagedFiles();

  if (!hasFiles) {
    console.log("⚠️ No staged files detected. Aborting.");
    return;
  }

  let files = await getStagedFiles();

  files = files.filter((file) => !file.includes("node_modules"));

  if (files.length === 0) {
    console.log("⚠️ No staged files after filtering node_modules. Aborting.");
    return;
  }

  console.log("🔍 Generating commit message...");

  const fileSummaries = files.map((f) => `modified: ${f}`).join("\n");

  const promptRaw = buildPromptForMultipleChanges(fileSummaries, useEmojis);

  const MAX_PROMPT_LENGTH = 10000;
  const prompt = truncatePrompt(promptRaw, MAX_PROMPT_LENGTH);

  const commitMessage = await generateCommitMessageWithGroq(apiKey, prompt);

  console.log("\n💡 Suggested commit message:\n");
  console.log(commitMessage);

  const userConfirmed = await askUserConfirmation(
    "\n❓ Do you want to use this commit message?"
  );

  if (!userConfirmed) {
    console.log("❌ Commit aborted by user.");
    return;
  }

  if (options.commit) {
    try {
      execSync(`git commit -m "${commitMessage}"`, { stdio: "inherit" });
      console.log("✅ Commit created successfully.");
    } catch (error) {
      console.error("❌ Failed to create commit:", error);
    }
  } else {
    console.log("✅ Commit message ready. Use the `-c` option to auto-commit.");
  }
});

program.parse();
