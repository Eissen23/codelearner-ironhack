import { CODELEARNER_API } from "../clients/codelearner";

export const deleteOrg = async (
  org_id: string,
  token: string
): Promise<{ message: string }> => {
  try {
    const response = await CODELEARNER_API.delete(`/orgs/${org_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error deleting org", error);
    throw error;
  }
};
