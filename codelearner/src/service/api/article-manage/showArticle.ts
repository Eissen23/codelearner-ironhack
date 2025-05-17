import { CODELEARNER_API } from "../clients/codelearner";
import { Article } from "../../../types/content/article.type";
import { Course } from "../../../types/org/course.type";
import { User } from "../../../types/auth.types";

type Response = {
  data: Article;
  belong_to: Course | "";
  author: User | "";
};

export const showArticle = async (
  article_id: string,
  is_belong: boolean = false,
  author: boolean = false
): Promise<Response> => {
  try {
    const response = await CODELEARNER_API.get(`/articles/${article_id}`, {
      params: {
        is_belong,
        author,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error fetching article data");
    throw error;
  }
};
