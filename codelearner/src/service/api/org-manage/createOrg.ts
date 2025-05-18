import { CODELEARNER_API } from "../clients/codelearner";
import { Moderator, Org } from "../../../types/org/org.type";

type Response = {
  organization: Org;
  head: Moderator;
};

export const createOrg = async (
  token: string | null,
  org: Omit<Org, "id" | "created_at" | "updated_at">
): Promise<Response> => {
  try {
    const response = await CODELEARNER_API.post<Response>("/orgs", org, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
