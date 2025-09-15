import { stepCountIs, streamText } from "ai";
import { google } from "@ai-sdk/google";
import { SYSTEM_PROMPT } from "./prompts";
import { getFileChangesInDirectoryTool, generateCommitMessageTool } from "./tools";
import { write } from "bun";


const codeReviewAgent = async (prompt: string) => {
  const result = streamText({
    model: google("models/gemini-2.5-flash"),
    prompt,
    system: SYSTEM_PROMPT,
    tools: {
      getFileChangesInDirectoryTool: getFileChangesInDirectoryTool,
      generateCommitMessageTool: generateCommitMessageTool,
    },
    stopWhen: stepCountIs(10),
  });

  const reviewChunks: string[] = [];
  for await (const chunk of result.textStream) {
    process.stdout.write(chunk);
    reviewChunks.push(chunk);
  }
  await write("code-review.md", reviewChunks.join(""));
  console.log("\nReview written to code-review.md");

  // Example: Generate a commit message from the code changes
  // You can fetch the file changes summary using the getFileChangesInDirectoryTool
  // Type-safe tool execution with minimal ToolCallOptions
  const toolCallOptions = { toolCallId: "manual", messages: [] };
  let fileChanges: { file: string; diff: string }[] = [];
  if (typeof getFileChangesInDirectoryTool.execute === "function") {
    const result = await getFileChangesInDirectoryTool.execute({ rootDir: "../my-agent" }, toolCallOptions);
    if (Symbol.asyncIterator in Object(result)) {
      // If result is AsyncIterable, collect all results
      for await (const chunk of result as AsyncIterable<{ file: string; diff: string }[]>) {
        fileChanges.push(...chunk);
      }
    } else if (Array.isArray(result)) {
      fileChanges = result;
    }
  }
  const diffSummary = fileChanges.map((fc: { file: string; diff: string }) => fc.diff).join("\n");
  let commitMessage = "";
  if (typeof generateCommitMessageTool.execute === "function") {
    const result = await generateCommitMessageTool.execute({ diffSummary }, toolCallOptions);
    if (Symbol.asyncIterator in Object(result)) {
      let msg = "";
      for await (const chunk of result as AsyncIterable<string>) {
        msg += chunk;
      }
      commitMessage = msg;
    } else if (typeof result === "string") {
      commitMessage = result;
    }
  }
  console.log("\nSuggested commit message:\n", commitMessage);
};

// Specify which directory the code review agent should review changes in your prompt
await codeReviewAgent(
  "Review the code changes in '../my-agent' directory, make your reviews and suggestions file by file",
);