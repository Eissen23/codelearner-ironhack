import { CODELEARNER_API } from "../clients/codelearner";
import { SolutionArticle } from "../../../types/content/solution.type";

type Response = {
  solution_articles: SolutionArticle;
};

export const makeSArticle = async (
  problem_id: string,
  data: Omit<
    SolutionArticle,
    "id" | "created_at" | "updated_at" | "problem_id"
  >,
  token: string
): Promise<Response> => {
  try {
    const response = await CODELEARNER_API.post<Response>(
      `problems/${problem_id}/add-solution`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("makeSArticle: ", error);
    throw error;
  }
};
