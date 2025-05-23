#!/usr/bin/env node

import { Command } from "commander";
import { loadConfig, saveConfig } from "./config/wisecommitConfig";
import {
  generateCommitMessages,
  hasStagedFiles,
  isGitRepo,
} from "./git/commitGen";
import { validateApiKey } from "./utils/validateApiKey";

const program = new Command();

program
  .name("wisecommit")
  .description(
    "Automated Conventional Commit message generator based on git diff"
  )
  .version("1.0.0")
  .option("-l, --limit <number>", "Number of lines per file to summarize")
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

  const limit = options.limit ? parseInt(options.limit, 10) : 10;
  const useEmojis =
    options.emojis !== undefined
      ? options.emojis === "true"
      : config.emojis ?? false;
  const apiKey = options.apiKey || config.apiKey || process.env.GROQ_API_KEY;

  const updatedConfig = {
    emojis: useEmojis,
    lang: config.lang ?? "en",
    apiKey,
  };

  const isConfigChange =
    options.emojis !== undefined || options.apiKey !== undefined;

  if (isConfigChange) {
    saveConfig(updatedConfig);
    return;
  }

  if (!(await isGitRepo())) {
    console.log("🚫 No Git repository detected in this directory.");
    console.log(
      "💡 Tip: Initialize a repository with `git init` before using this command."
    );
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

  console.log("🔍 Generating commit messages...");

  await new Promise((resolve) => setTimeout(resolve, 1000));

  process.env.GROQ_API_KEY = apiKey;

  const messages = await generateCommitMessages({
    limit,
    useEmojis,
  });

  console.log("\n💡 Suggested commit messages:\n");
  messages.forEach((message: string) => console.log(message));

  if (options.commit) {
    console.log("\n📝 Creating git commits...");
    for (const msg of messages) {
      const { execSync } = await import("child_process");
      execSync(`git commit -m "${msg}"`, { stdio: "inherit" });
    }
  }
});

program.parse();
