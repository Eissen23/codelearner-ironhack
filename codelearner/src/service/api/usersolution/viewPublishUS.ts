import { CODELEARNER_API } from "../clients/codelearner";
import { UserSolution } from "../../../types/content/solution.type";

type response = {
  user_solutions: UserSolution[];
};

export const viewPublishUS = async (
  problem_id: string,
  token: string
): Promise<response> => {
  try {
    const response = await CODELEARNER_API.get<response>(
      `problems/${problem_id}/view-solution`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("viewPublishUS", error);
    throw error;
  }
};
