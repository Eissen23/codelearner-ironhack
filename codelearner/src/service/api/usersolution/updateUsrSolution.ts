import {
  UserSolution,
  UserSolutionRes,
} from "../../../types/content/solution.type";
import { CODELEARNER_API } from "../clients/codelearner";

export const updateUsrSolution = async (
  token: string,
  data: Omit<
    UserSolution,
    "created_at" | "upadated_at" | "user_submission" | "status"
  >
): Promise<UserSolutionRes> => {
  const uri = `solutions/your-solution/${data.id}`;

  try {
    const response = await CODELEARNER_API.put<UserSolutionRes>(uri, data, {
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
