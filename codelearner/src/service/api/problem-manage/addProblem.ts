import { ProblemData } from "../../../types/content/problem.type";
import { CODELEARNER_API } from "../clients/codelearner";

export const addProblem = async (
  token: string,
  problem: Omit<ProblemData, "id">
): Promise<ProblemData> => {
  try {
    const response = await CODELEARNER_API.post(
      `/problem-sets/${problem.problem_set}/add-problem`,
      problem,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Add problem error", error);
    throw error;
  }
};
