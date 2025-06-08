import {
  ProblemSet,
  ProblemSetFormData,
} from "../../../types/org/problem_set.type";
import { createFormData } from "../../../utils/createFormData";
import { CODELEARNER_API } from "../clients/codelearner";

type Response = {
  data: ProblemSet;
};
export const addProblemSet = async (
  problem_set: ProblemSetFormData,
  token?: string
): Promise<Response> => {
  const sentFormData = createFormData(problem_set);

  try {
    const response = await CODELEARNER_API.post(
      `/orgs/${problem_set.org_id}/add-problem-set`,
      sentFormData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("failed to add problem set", error);
    throw error;
  }
};
