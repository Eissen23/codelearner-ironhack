import { SubmissionParams } from "../../../types/code/judge0.type";
import { JUDGE0_API } from "../clients/judge0";
import axios from "axios";
import { SubmissionResponse } from "../../../types/code/judge0.type";

export const createSubmission = async (
  params: SubmissionParams
): Promise<SubmissionResponse> => {
  try {
    const response = await JUDGE0_API.post(
      "/submissions?wait=true",
      {
        source_code: params.source_code,
        language_id: params.language_id,
        stdin: params.stdin,
        expected_output: params.expected_output,
      },
      {
        signal: params.signal,
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
    } else {
      console.error("Error creating submission:", error);
    }
    throw error;
  }
};
