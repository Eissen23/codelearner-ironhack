import { PaginatedUsrSolution } from "../../../types/content/solution.type";
import { CODELEARNER_API } from "../clients/codelearner";

export const getUsrSolutions = async (
  token: string,
  submission_id?: string
): Promise<PaginatedUsrSolution> => {
  const uri = submission_id
    ? `solutions/your-solution/${submission_id}`
    : `solutions/your-solution`;
  try {
    const response = await CODELEARNER_API.get<PaginatedUsrSolution>(uri, {
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
