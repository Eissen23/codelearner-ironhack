import { CODELEARNER_API } from "../clients/codelearner";
import { ProblemSetInfoResponse } from "../../../types/org/problem_set.type";

export const getProblemSetInfo = async (
  problem_set_id: string
): Promise<ProblemSetInfoResponse> => {
  try {
    const response = await CODELEARNER_API.get<ProblemSetInfoResponse>(
      `problem-sets/${problem_set_id}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching problem set info", error);
    throw error;
  }
};
