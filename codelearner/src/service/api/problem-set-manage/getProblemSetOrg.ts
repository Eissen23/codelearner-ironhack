import { CODELEARNER_API } from "../clients/codelearner";
import { ProblemSetResponse } from "../../../types/org/problem_set.type";

export const getProblemSetOrg = async (
  org_id: string
): Promise<ProblemSetResponse> => {
  try {
    const response = await CODELEARNER_API.get(`/orgs/${org_id}/problem-sets`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
