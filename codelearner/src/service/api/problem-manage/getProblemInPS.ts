import { CODELEARNER_API } from "../clients/codelearner";
import { ProblemResponse } from "../../../types/content/problem.type";

export const getProblemInPS = async (
  problem_set_id: string
): Promise<ProblemResponse> => {
  try {
    const response = await CODELEARNER_API.get<ProblemResponse>(
      `problem-sets/${problem_set_id}/problems`
    );
    return response.data;
  } catch (error) {
    console.log("Errow while fetching problems data:", error);
    throw error;
  }
};
