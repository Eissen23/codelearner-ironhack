import { ProblemData } from "../../../types/content/problem.type";
import { CODELEARNER_API } from "../clients/codelearner";

type Response = {
  message: string;
  problem: ProblemData;
};

export const updateProblem = async (
  token: string,
  problem: ProblemData
): Promise<Response> => {
  try {
    const response = await CODELEARNER_API.put<Response>(
      `/problems/${problem.id}`,
      problem,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error updating problem", error);
    throw error;
  }
};
