import { CODELEARNER_API } from "../clients/codelearner";
import { SolutionArticle } from "../../../types/content/solution.type";

type Response = {
  message: string;
  data: SolutionArticle;
};

export const updateSArticle = async (
  sol_atricle_id: string,
  data: Omit<
    SolutionArticle,
    "id" | "problem_id" | "created_at" | "updated_at" | "problem"
  >,
  token: string
): Promise<Response> => {
  try {
    const response = await CODELEARNER_API.put<Response>(
      `solutions/mod/edit/${sol_atricle_id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`updateSArticle:`, error);
    throw error;
  }
};
