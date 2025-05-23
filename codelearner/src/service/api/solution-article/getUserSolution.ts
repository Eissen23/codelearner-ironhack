import { UserSolution } from "../../../types/content/solution.type";
import { CODELEARNER_API } from "../clients/codelearner";

type Response = {
  user_solution: UserSolution;
};

export const getUserSolution = async (
  user_solution_id: string,
  token: string
): Promise<Response> => {
  try {
    const response = await CODELEARNER_API.get<Response>(
      `solutions/user-solution/${user_solution_id}`,
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
