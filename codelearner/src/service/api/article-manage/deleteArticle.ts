import { CODELEARNER_API } from "../clients/codelearner";

export const deleteArticle = async (
  token: string,
  article_id: string
): Promise<{ message: string }> => {
  try {
    const response = await CODELEARNER_API.delete(`/articles/${article_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log("error deleting article", error);
    throw error;
  }
};
