import { JUDGE0_API } from "../clients/judge0";
import { BatchToken, SubmissionParams } from "../../../types/code/judge0.type";

//testcase +  sourcecode + language_id

/* {
  "source_code": "your_source_code",
  "language_id": 52,
  ""stdin": "tescase1.input"
  "expected_output": "testcase.output"
} */

export const createBatchSubmission = async (
  subs: SubmissionParams[]
): Promise<BatchToken[]> => {
  try {
    const result = await JUDGE0_API.post<BatchToken[]>("submissions/batch", {
      submissions: subs,
    });

    return result.data;
  } catch (error) {
    console.log("error when create batch submission");
    throw error;
  }
};
