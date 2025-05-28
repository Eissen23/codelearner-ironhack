import { CODELEARNER_API } from "../clients/codelearner";
import { Org } from "../../../types/org/org.type";

export const getUserOrg = async (
  token: string,
  role?: "OrgHead" | "Moderator" | "Pending"
): Promise<Org[]> => {
  try {
    const response = await CODELEARNER_API.get<Org[]>("/member/your-orgs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        as_role: role,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error fetching member/your-orgs");
    throw error;
  }
};
