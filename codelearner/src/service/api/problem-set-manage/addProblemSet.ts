import { ProblemSet } from "../../../types/org/problem_set.type";
import { CODELEARNER_API } from "../clients/codelearner";

type Response = {
  data: ProblemSet;
};
export const addProblemSet = async (
  problem_set: Omit<ProblemSet, "id" | "created_at">,
  token?: string
): Promise<Response> => {
  try {
    const response = await CODELEARNER_API.post(
      `/orgs/${problem_set.org_id}/add-problem-set`,
      problem_set,
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
