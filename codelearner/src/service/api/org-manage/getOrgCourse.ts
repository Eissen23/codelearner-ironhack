import { CODELEARNER_API } from "../clients/codelearner";
import { Org } from "../../../types/org/org.type";

export const getOrgsList = async (id: number): Promise<Org> => {
  try {
    const response = await CODELEARNER_API.get(`/orgs/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
