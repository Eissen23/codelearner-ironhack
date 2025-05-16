import { CODELEARNER_API } from "../clients/codelearner";
import { ProblemSetInfoResponse } from "../../../types/org/problem_set.type";

export const getProblemSetInfo = async (
  problem_set_id: string,
  belong?: boolean
): Promise<ProblemSetInfoResponse> => {
  const uri = belong
    ? `problem-sets/${problem_set_id}?is_belong=${belong}`
    : `problem-sets/${problem_set_id}`;

  try {
    const response = await CODELEARNER_API.get<ProblemSetInfoResponse>(uri);
    return response.data;
  } catch (error) {
    console.log("Error fetching problem set info", error);
    throw error;
  }
};
