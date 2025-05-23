import simpleGit from "simple-git";

const git = simpleGit();

export interface GenerateCommitMessagesOptions {
  limit: number;
  useEmojis: boolean;
}

export async function isGitRepo(): Promise<boolean> {
  try {
    await git.revparse(["--is-inside-work-tree"]);
    return true;
  } catch {
    return false;
  }
}

export async function hasStagedFiles(): Promise<boolean> {
  const diff = await git.diff(["--cached", "--name-only"]);
  return diff.trim().length > 0;
}

export async function generateCommitMessages({
  limit,
  useEmojis,
}: GenerateCommitMessagesOptions): Promise<string[]> {
  const files = await git.diff(["--cached", "--name-only"]);
  const fileList = files.split("\n").filter(Boolean).slice(0, limit);

  const baseMessages: string[] = fileList.map((file) => {
    let baseMessage = `feat(${file}): update file`;
    if (useEmojis) {
      baseMessage = `✨ ${baseMessage}`;
    }
    return baseMessage;
  });

  return baseMessages;
}
