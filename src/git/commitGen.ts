import simpleGit from "simple-git";

const git = simpleGit();

export async function isGitRepo(): Promise<boolean> {
  try {
    await git.revparse(["--is-inside-work-tree"]);
    return true;
  } catch {
    return false;
  }
}

export async function hasStagedFiles(): Promise<boolean> {
  const diff = await git.diff(["--cached"]);
  return diff.trim().length > 0;
}

export async function getStagedFiles(): Promise<string[]> {
  const filesOutput = await git.diff(["--cached", "--name-only"]);
  return filesOutput
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean);
}

export async function getFileDiff(file: string): Promise<string> {
  const diffOutput = await git.diff(["--cached", "--", file]);
  return diffOutput;
}
