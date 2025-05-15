import { CODELEARNER_API } from "../clients/codelearner";
import { Article } from "../../../types/content/article.type";

type Response = {
  article: Article;
};

export const addArticle = async (
  token: string,
  article: Omit<Article, "id" | "created_at" | "updated_at">
): Promise<Response> => {
  try {
    const response = await CODELEARNER_API.post<Response>(
      `/courses/${article.course_id}}/add-article`,
      article,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error when add article");
    throw error;
  }
};
