import { CODELEARNER_API } from "../clients/codelearner";
import { UserSubmission } from "../../../types/content/submission.type";

export const getUserOrg = async (token: string): Promise<UserSubmission[]> => {
  try {
    const response = await CODELEARNER_API.get<UserSubmission[]>(
      "/member/submission",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error fetching member/your-orgs");
    throw error;
  }
};
