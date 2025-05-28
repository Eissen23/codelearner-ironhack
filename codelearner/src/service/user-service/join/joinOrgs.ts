import { Moderator } from "../../../types/org/org.type";
import { CODELEARNER_API } from "../../api/clients/codelearner";

type response = {
  message: string;
  submission: Moderator;
};

export const joinOrgs = async (
  orgs_id: string,
  token: string
): Promise<response> => {
  try {
    const response = await CODELEARNER_API.post<response>(
      `orgs/${orgs_id}/join-mod`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("joinOrgs", error);
    throw error;
  }
};
