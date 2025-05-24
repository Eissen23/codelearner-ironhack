import { CODELEARNER_API } from "../api/clients/codelearner";

export const isOrgHead = async (token: string, org_id: string) => {
  try {
    const response = await CODELEARNER_API.get<boolean>(
      `/orgs/${org_id}/allow`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
