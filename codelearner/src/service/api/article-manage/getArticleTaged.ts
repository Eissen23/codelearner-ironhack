import { ArticleResponse } from "../../../types/content/article.type";
import { CODELEARNER_API } from "../clients/codelearner";

export const getArticlesTaged = async (
  tags: string
): Promise<ArticleResponse> => {
  try {
    const response = await CODELEARNER_API.get(`articles`, {
      params: {
        tags: tags,
      },
    });

    return response.data;
  } catch (error) {
    console.log("failed to get tagged article");
    throw error;
  }
};
