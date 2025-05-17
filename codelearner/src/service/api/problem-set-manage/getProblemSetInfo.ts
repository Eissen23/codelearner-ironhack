import { CODELEARNER_API } from "../clients/codelearner";
import { ProblemSetInfoResponse } from "../../../types/org/problem_set.type";

export const getProblemSetInfo = async (
  problem_set_id: string,
  is_belong: boolean = false
): Promise<ProblemSetInfoResponse> => {
  try {
    const response = await CODELEARNER_API.get<ProblemSetInfoResponse>(
      `problem-sets/${problem_set_id}`,
      {
        params: {
          is_belong,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching problem set info", error);
    throw error;
  }
};
