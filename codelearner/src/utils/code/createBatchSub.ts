import { SubmissionParams } from "../../types/code/judge0.type";
import { TestCase } from "../../types/content/problem.type";
export const createBatchSubmission = (
  source_code: string,
  language_id: number,
  testcase?: TestCase
): SubmissionParams[] => {
  if (!testcase) {
    return [];
  }

  const subs = testcase.input.map((input, index) => ({
    source_code: source_code,
    language_id: language_id,
    stdin: input,
    expected_output: testcase.output[index],
  }));

  return subs;
};
