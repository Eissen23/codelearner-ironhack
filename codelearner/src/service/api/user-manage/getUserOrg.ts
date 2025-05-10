import { CODELEARNER_API } from "../clients/codelearner";
import { Org } from "../../../types/org/org.type";

export const getUserOrg = async (token: string): Promise<Org[]> => {
  try {
    const response = await CODELEARNER_API.get<Org[]>("/member/your-orgs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error fetching member/your-orgs");
    throw error;
  }
};
