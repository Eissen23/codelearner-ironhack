import { CODELEARNER_API } from "../clients/codelearner";
import { Article, Author } from "../../../types/content/article.type";
import { Course } from "../../../types/org/course.type";

type Response = {
  data: Article;
  belong_to: Course | "";
  author: Author ;
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
