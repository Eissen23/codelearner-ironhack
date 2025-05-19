import { ProblemResponse } from "../../../types/content/problem.type";
import { CODELEARNER_API } from "../clients/codelearner";

//check this problem
export const getProblems = async ({
  problemSetId,
  page,
  perPage,
  keyword,
  sort,
  tags,
}: {
  problemSetId?: string;
  page?: string;
  perPage?: string;
  keyword?: string;
  sort?: string;
  tags?: string;
}): Promise<ProblemResponse> => {
  try {
    const url = problemSetId
      ? `problem-sets/${problemSetId}/problems`
      : "/problems";

    const response = await CODELEARNER_API.get<ProblemResponse>(url, {
      params: {
        c_keyword: keyword || undefined,
        sort: sort || undefined,
        per_page: perPage || undefined,
        page: page || undefined,
        tags: tags,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching problems data:", error);
    throw error;
  }
};
