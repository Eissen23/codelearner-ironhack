import { Article } from "../../../types/content/article.type";
import { CODELEARNER_API } from "../clients/codelearner";

type Response = {
  message: string;
  article: Article;
};

export const updateArticle = async (
  token: string,
  article: Omit<Article, "created_at" | "updated_at">
): Promise<Response> => {
  try {
    const result = await CODELEARNER_API.put<Response>(
      `/articles/${article.id}`,
      article,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return result.data;
  } catch (error) {
    console.log("Update article failed");
    throw error;
  }
};
