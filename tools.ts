const commitMessageInput = z.object({
  diffSummary: z.string().min(1).describe("A summary of the code changes"),
});

type CommitMessageInput = z.infer<typeof commitMessageInput>;

async function generateCommitMessage({ diffSummary }: CommitMessageInput) {
  // Here you could use an AI model to generate a commit message from the diff summary
  // For now, just return a placeholder
  return `feat: ${diffSummary}`;
}

export const generateCommitMessageTool = tool({
  description: "Generates a commit message from code changes",
  inputSchema: commitMessageInput,
  execute: generateCommitMessage,
});
import { tool } from "ai";
import { simpleGit } from "simple-git";
import { z } from "zod";

const excludeFiles = ["dist", "bun.lock"];

const fileChange = z.object({
  rootDir: z.string().min(1).describe("The root directory"),
});

type FileChange = z.infer<typeof fileChange>;

async function getFileChangesInDirectory({ rootDir }: FileChange) {
  const git = simpleGit(rootDir);
  const summary = await git.diffSummary();
  const diffs: { file: string; diff: string }[] = [];

  for (const file of summary.files) {
    if (excludeFiles.includes(file.file)) continue;
    const diff = await git.diff(["--", file.file]);
    diffs.push({ file: file.file, diff });
  }

  return diffs;
}

export const getFileChangesInDirectoryTool = tool({
  description: "Gets the code changes made in given directory",
  inputSchema: fileChange,
  execute: getFileChangesInDirectory,
});