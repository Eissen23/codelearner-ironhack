import { CODELEARNER_API } from "../clients/codelearner";
import { Org } from "../../../types/org/org.type";

export const getOrgsDetail = async (id: string): Promise<Org> => {
  try {
    const { data } = await CODELEARNER_API.get(`/orgs/${id}`);
    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
