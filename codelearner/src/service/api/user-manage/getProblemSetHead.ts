import { CODELEARNER_API } from "../clients/codelearner";
import { ProblemSet } from "../../../types/org/problem_set.type";

export const getProblemSetHead = async (
  token: string
): Promise<ProblemSet[]> => {
  try {
    const response = await CODELEARNER_API.get<ProblemSet[]>(
      "/member/modrated-problemset",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error fetching member/modrated-problemset");
    throw error;
  }
};
