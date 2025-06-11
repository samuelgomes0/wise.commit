import simpleGit, { SimpleGit } from "simple-git";

const git: SimpleGit = simpleGit();

/**
 * Verifica se o diretório atual é um repositório Git.
 */
export async function isGitRepo(): Promise<boolean> {
  try {
    await git.revparse(["--is-inside-work-tree"]);
    return true;
  } catch {
    return false;
  }
}

/**
 * Verifica se há arquivos staged para commit.
 */
export async function hasStagedFiles(): Promise<boolean> {
  try {
    const diff = await git.diff(["--cached"]);
    return diff.trim().length > 0;
  } catch (error) {
    console.error("🚫 Failed to check staged files:", error);
    return false;
  }
}

/**
 * Retorna uma lista de arquivos staged.
 */
export async function getStagedFiles(): Promise<string[]> {
  try {
    const filesOutput = await git.diff(["--cached", "--name-only"]);
    return filesOutput
      .split("\n")
      .map((file) => file.trim())
      .filter(Boolean);
  } catch (error) {
    console.error("🚫 Failed to get staged files:", error);
    return [];
  }
}

/**
 * Retorna o diff de um arquivo staged específico.
 * @param file Caminho do arquivo
 */
export async function getFileDiff(file: string): Promise<string> {
  try {
    return await git.diff(["--cached", "--", file]);
  } catch (error) {
    console.error(`🚫 Failed to get diff for file "${file}":`, error);
    return "";
  }
}
