import { CODELEARNER_API } from "../clients/codelearner";
import { Org, OrgUpdateRes } from "../../../types/org/org.type";

export const updateOrg = async (
  token: string | null,
  org: Omit<Org, "created_at" | "updated_at" | "logo">
): Promise<OrgUpdateRes> => {
  try {
    const response = await CODELEARNER_API.put<OrgUpdateRes>(
      `/orgs/${org.id}`,
      org,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
