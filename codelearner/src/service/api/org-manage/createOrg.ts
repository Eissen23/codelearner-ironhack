import { CODELEARNER_API } from "../clients/codelearner";
import { Org } from "../../../types/org/org.type";

export const createOrg = async (
  token: string | null,
  org: Omit<Org, "id" | "created_at" | "updated_at">
): Promise<Org> => {
  try {
    const response = await CODELEARNER_API.post<Org>("/orgs", org, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
