import { CODELEARNER_API } from "../clients/codelearner";
import { OrgListResponse } from "../../../types/org/org.type";

export const getOrgsList = async (): Promise<OrgListResponse> => {
  try {
    const response = await CODELEARNER_API.get("/orgs");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
