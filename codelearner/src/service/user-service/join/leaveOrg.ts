import { CODELEARNER_API } from "../../api/clients/codelearner";

type Response = {
  message: string;
};

export const leaveOrg = async (
  org_id: string,
  token: string
): Promise<Response> => {
  try {
    const response = await CODELEARNER_API.delete<Response>(
      `/orgs/${org_id}/leave`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("leaveOrg: ", error);
    throw error;
  }
};
