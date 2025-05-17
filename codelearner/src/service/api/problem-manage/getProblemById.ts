import { CODELEARNER_API } from "../clients/codelearner";
import { ProblemData } from "../../../types/content/problem.type";
import { ProblemSet } from "../../../types/org/problem_set.type";

type Response = {
  problem: ProblemData;
  belong_to: ProblemSet;
};

export const getProblemByID = async (
  problem_id: string,
  belong_to?: false
): Promise<Response> => {
  const custom_uri = belong_to
    ? `/problems/${problem_id}?belong_to=${belong_to}`
    : `/problems/${problem_id}`;
  try {
    const response = await CODELEARNER_API.get<Response>(custom_uri);
    return response.data;
  } catch (error) {
    console.log("Errot get problem by id", error);
    throw error;
  }
};
