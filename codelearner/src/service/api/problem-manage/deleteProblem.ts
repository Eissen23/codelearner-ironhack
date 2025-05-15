import { CODELEARNER_API } from "../clients/codelearner";

export const deleteArticle = async (
  token: string,
  problem_id: string
): Promise<{ message: string }> => {
  try {
    const response = await CODELEARNER_API.delete(`/problems/${problem_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log("error deleting problem", error);
    throw error;
  }
};
