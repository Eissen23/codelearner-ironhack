import { ProblemResponse } from "../../../types/content/problem.type";
import { CODELEARNER_API } from "../clients/codelearner";

export const getProblemList = async (
  page?: string,
  per_page?: string,
  keyword?: string,
  sort?: string
): Promise<ProblemResponse> => {
  try {
    const response = await CODELEARNER_API.get<ProblemResponse>("/problems", {
      params: {
        keyword: keyword || undefined,
        sort: sort || undefined,
        per_page: per_page || undefined,
        page: page || undefined,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
