import { getBatchSubmission } from "./getBatchSubmission";
import { BatchToken } from "../../../types/code/judge0.type";

export const waitForProcessing = async (tokens: BatchToken[]) => {
  const maxRetries = 20; // Adjust as needed
  const retryDelay = 500; // 500ms between checks, adjust as needed
  let retries = 0;

  while (retries < maxRetries) {
    // Check status of all submissions
    const { submissions } = await getBatchSubmission(tokens);

    // Check if all submissions are done processing
    const allDone = submissions.map((submission) => {
      // Judge0 status codes: 1 = In Queue, 2 = Processing
      // Add other statuses that indicate "not finished" as needed
      return submission.status?.id !== 1 && submission.status?.id !== 2;
    });

    if (allDone.every((done) => done)) {
      return tokens;
    }

    // Wait before checking again
    await new Promise((resolve) => setTimeout(resolve, retryDelay));
    retries++;
  }

  // If we reach here, we've hit max retries
  throw new Error("Timeout waiting for submissions to process");
};
