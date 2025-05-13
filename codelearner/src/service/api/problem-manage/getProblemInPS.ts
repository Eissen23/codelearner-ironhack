import { CODELEARNER_API } from "../clients/codelearner";
import { ProblemResponse } from "../../../types/content/problem.type";

export const getProblemInPS = async (
  problem_set_id: string,
  page?: string
): Promise<ProblemResponse> => {
  try {
    const response = await CODELEARNER_API.get<ProblemResponse>(
      `problem-sets/${problem_set_id}/problems${page ? `?page=${page}` : ""}`
    );
    return response.data;
  } catch (error) {
    console.log("Error while fetching problems data:", error);
    throw error;
  }
};
