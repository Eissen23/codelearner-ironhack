import { CODELEARNER_API } from "../clients/codelearner";
import { ProblemData } from "../../../types/content/problem.type";

type Response = {
  data: ProblemData;
};

export const getProblemByID = async (problem_id: string): Promise<Response> => {
  try {
    const response = await CODELEARNER_API.get<Response>(
      `/problems/${problem_id}`
    );
    return response.data;
  } catch (error) {
    console.log("Errot get problem by id", error);
    throw error;
  }
};
