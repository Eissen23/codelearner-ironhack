import { UserSolutionRes } from "../../../types/content/solution.type";
import { CODELEARNER_API } from "../clients/codelearner";

export const addUsrSoltion = async (
  token: string,
  submission_id: string
): Promise<UserSolutionRes> => {
  const uri = `solutions/your-solution/${submission_id}`;

  try {
    const response = await CODELEARNER_API.get<UserSolutionRes>(uri, {
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
