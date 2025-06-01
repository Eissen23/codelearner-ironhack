import { CODELEARNER_API } from "../../clients/codelearner";

type Response = {
  message: string;
  role?: string;
};
export const changeMod = async (
  org_id: string,
  token: string,
  mod_id: string,
  role: "OrgHead" | "Moderator" | "Reject"
): Promise<Response> => {
  try {
    const response = await CODELEARNER_API.put<Response>(
      `/orgs/${org_id}/mods/${mod_id}`,
      {
        role,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("changeMod", error);
    throw error;
  }
};
