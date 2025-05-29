import { CODELEARNER_API } from "../clients/codelearner";
import { OrgUser } from "../../../types/org/org.type";

export const getUserOrg = async (
  token: string,
  role?: "OrgHead" | "Moderator" | "Pending"
): Promise<OrgUser> => {
  try {
    const response = await CODELEARNER_API.get<OrgUser>("/member/your-orgs", {
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
