import { SolutionArticle } from "../../../types/content/solution.type";
import { CODELEARNER_API } from "../clients/codelearner";

type Response = {
  data: SolutionArticle;
};

export const getSArticleInfo = async (
  solution_article_id: string,
  token: string
): Promise<Response> => {
  try {
    const response = await CODELEARNER_API.get<Response>(
      `solutions/mod/${solution_article_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
