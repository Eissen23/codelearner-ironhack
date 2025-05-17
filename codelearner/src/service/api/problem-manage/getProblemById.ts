import { CODELEARNER_API } from "../clients/codelearner";
import { ProblemData } from "../../../types/content/problem.type";
import { ProblemSet } from "../../../types/org/problem_set.type";

type Response = {
  problem: ProblemData;
  belong_to: ProblemSet;
};

export const getProblemByID = async (
  problem_id: string,
  is_belong: boolean = false
): Promise<Response> => {
  try {
    const response = await CODELEARNER_API.get<Response>(
      `/problems/${problem_id}`,
      {
        params: {
          is_belong,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Errot get problem by id", error);
    throw error;
  }
};
