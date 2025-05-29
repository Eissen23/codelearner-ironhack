import { ModList } from "../../../../types/user.type";
import { CODELEARNER_API } from "../../clients/codelearner";

type Response = {
  moderators: ModList;
};

export const showModInOrg = async (
  org_id: string,
  token: string
): Promise<Response> => {
  try {
    const response = await CODELEARNER_API.get<Response>(
      `orgs/${org_id}/mods`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.log("showModInOrg", error);
    throw error;
  }
};
