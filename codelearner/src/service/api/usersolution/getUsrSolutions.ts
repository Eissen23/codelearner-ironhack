import { PaginatedUsrSolution } from "../../../types/content/solution.type";
import { CODELEARNER_API } from "../clients/codelearner";

type Response = {
  user_solution: PaginatedUsrSolution;
};

export const getUsrSolutions = async (token: string): Promise<Response> => {
  const uri = `solutions/your-solution`;
  try {
    const response = await CODELEARNER_API.get<Response>(uri, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(`addUsrSoltion: `, error);
    throw error;
  }
};
