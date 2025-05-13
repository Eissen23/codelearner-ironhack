import { CODELEARNER_API } from "../../api/clients/codelearner";
import { ResultData, SubmitResponse } from "../../../types/code/judge0.type";

export const submitAnswer = async (
  token: string,
  data: Omit<ResultData, "id" | "created_at" | "update_at">
): Promise<SubmitResponse> => {
  try {
    const response = CODELEARNER_API.post(
      `/problems/${data.problem_id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return (await response).data;
  } catch (error) {
    console.log("error while submiting answer", error);
    throw error;
  }
};
