import { ArticleResponse } from "../../../types/content/article.type";
import { CODELEARNER_API } from "../clients/codelearner";

export const getArticleFromCourse = async (
  course_id: string
): Promise<ArticleResponse> => {
  try {
    const response = await CODELEARNER_API.get(
      `/courses/${course_id}/list-articles`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};
