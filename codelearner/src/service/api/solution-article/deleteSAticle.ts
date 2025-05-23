import { CODELEARNER_API } from "../clients/codelearner";

type response = {
  message: string;
};

export const deleteSarticle = async (
  solution_article_id: string,
  token: string
): Promise<response> => {
  try {
    const response = await CODELEARNER_API.delete<response>(
      `solutions/mod/del/${solution_article_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("deleteSarticle", error);
    throw error;
  }
};
