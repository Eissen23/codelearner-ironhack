import { CODELEARNER_API } from "../clients/codelearner";
import { ProblemSetResponse } from "../../../types/org/problem_set.type";

export const getProblemSet = async (
  page?: string,
  keyword?: string,
  sort?: string,
  per_page?: string
): Promise<ProblemSetResponse> => {
  try {
    const response = await CODELEARNER_API.get("/problem-sets", {
      params: {
        page: page || undefined,
        per_page: per_page || undefined,
        keyword: keyword || undefined,
        sort: sort || undefined,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
