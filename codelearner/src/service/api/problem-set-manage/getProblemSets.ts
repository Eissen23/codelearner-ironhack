import { CODELEARNER_API } from "../clients/codelearner";
import { ProblemSetResponse } from "../../../types/org/problem_set.type";

export const getProblemSets = async (
  orgId?: string,
  page?: string,
  perPage?: string,
  keyword?: string,
  sort?: string
): Promise<ProblemSetResponse> => {
  try {
    const url = orgId ? `/orgs/${orgId}/problem-sets` : "/problem-sets";

    const response = await CODELEARNER_API.get<ProblemSetResponse>(url, {
      params: {
        page: page || undefined,
        per_page: perPage || undefined,
        keyword: keyword || undefined,
        sort: sort || undefined,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching problem sets data:", error);
    throw error;
  }
};
