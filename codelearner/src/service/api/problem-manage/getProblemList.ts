import { ProblemResponse } from "../../../types/content/problem.type";
import { CODELEARNER_API } from "../clients/codelearner";

export const getProblemList = async (
  page?: string
): Promise<ProblemResponse> => {
  try {
    const response = await CODELEARNER_API.get<ProblemResponse>(
      `/problems${page ? `?page=${page}` : ""}`
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
