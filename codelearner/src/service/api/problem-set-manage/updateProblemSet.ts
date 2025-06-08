import { CODELEARNER_API } from "../clients/codelearner";
import { ProblemSet } from "../../../types/org/problem_set.type";

type Response = {
  message: string;
  problem_set: ProblemSet;
};

export const updateProblemSet = async (
  token: string | null,
  problem_set: Omit<ProblemSet, "created_at" | "updated_at" | "logo">
): Promise<Response> => {
  try {
    const response = await CODELEARNER_API.put<Response>(
      `/problem-sets/${problem_set.id}`,
      problem_set,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
