import {
  UserSolution,
  UserSolutionRes,
} from "../../../types/content/solution.type";
import { CODELEARNER_API } from "../clients/codelearner";

export const addUsrSoltion = async (
  submission_id: string,
  sub: Omit<UserSolution, "id" | "created_at" | "updated_at">,
  token: string
): Promise<UserSolutionRes> => {
  try {
    const response = await CODELEARNER_API.post<UserSolutionRes>(
      `solutions/make-solution/${submission_id}`,
      sub,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`addUsrSoltion: `, error);
    throw error;
  }
};
