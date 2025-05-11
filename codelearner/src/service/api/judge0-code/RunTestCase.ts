import { SubmissionParams } from "../../../types/code/judge0.type";
import { createBatchSubmission } from "./createBatchSubmission";
import { getBatchSubmission } from "./getBatchSubmission";
import { waitForProcessing } from "./waitForToken";

export const runTestCase = async (submissions: SubmissionParams[]) => {
  const tokens = await createBatchSubmission(submissions);

  const finalTokens = await waitForProcessing(tokens);

  const results = await getBatchSubmission(finalTokens);
  return results;
};
