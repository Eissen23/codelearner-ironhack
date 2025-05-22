import { PaginatedUsrSolution } from "../../../types/content/solution.type";
import { CODELEARNER_API } from "../clients/codelearner";

type Response = {
  user_solution: PaginatedUsrSolution;
};

export const getProblemSubMod = async (
  problem_id: string,
  token: string
): Promise<Response> => {
  try {
    const response = await CODELEARNER_API.get<Response>(
      `problems/${problem_id}/user-solution-mod`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("getProblemSub:", error);
    throw error;
  }
};
