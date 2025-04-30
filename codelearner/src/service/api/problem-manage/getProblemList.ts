import { ProblemResponse } from "../../../types/problem.type";
import { CODELEARNER_API } from "../clients/codelearner";


// TODO: rewrite this function to use CODELEARNER_API
export const getProblemList = async (
): Promise<ProblemResponse> => {
  try {
    const response = await CODELEARNER_API.get<ProblemResponse>(
      `/problems`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
