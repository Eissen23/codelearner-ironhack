import { CODELEARNER_API } from "../clients/codelearner";
import { SolutionArticle } from "../../../types/content/solution.type";

type Response = {
  solution_articles: SolutionArticle[];
};

const getSArticle = async (problem_id: string): Promise<Response> => {
  try {
    const response = await CODELEARNER_API.get<Response>(
      `problems/${problem_id}/solutions`
    );
    return response.data;
  } catch (error) {
    console.log("getSArticle: ", error);
    throw error;
  }
};

export default getSArticle;
