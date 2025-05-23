import fs from "fs";
import os from "os";
import path from "path";

export interface WiseCommitConfig {
  emojis: boolean;
  lang: string;
  apiKey?: string;
}

const CONFIG_FILE = path.join(os.homedir(), ".wisecommitrc");

export function loadConfig(): WiseCommitConfig {
  if (!fs.existsSync(CONFIG_FILE)) {
    return { emojis: false, lang: "en" };
  }
  const content = fs.readFileSync(CONFIG_FILE, "utf-8");
  try {
    return JSON.parse(content) as WiseCommitConfig;
  } catch {
    console.error("❌ Failed to parse .wisecommitrc. Using defaults.");
    return { emojis: false, lang: "en" };
  }
}

export function saveConfig(config: WiseCommitConfig): void {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
  console.log("✅ Configuration saved to ~/.wisecommitrc");
}
