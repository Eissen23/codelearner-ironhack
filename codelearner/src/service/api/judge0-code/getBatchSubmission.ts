import {
  BatchToken,
  SubmissionResponse,
} from "../../../types/code/judge0.type";
import { JUDGE0_API } from "../clients/judge0";

type BatchSubRes = {
  submissions: SubmissionResponse[];
};

export const getBatchSubmission = async (
  batchToken: BatchToken[]
): Promise<BatchSubRes> => {
  const tokens = batchToken.map((token) => token.token).join(",");
  try {
    const response = await JUDGE0_API.get<BatchSubRes>(
      `/submissions/batch?tokens=${tokens}`
    );
    return response.data;
  } catch (error) {
    console.log("error when get batch submission");
    throw error;
  }
};
