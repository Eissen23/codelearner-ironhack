import { CODELEARNER_API } from "../clients/codelearner";

type Response = {
  message: string;
};

export const deleteProblemSet = async (
  token: string | null,
  problem_set_id: string
): Promise<Response> => {
  try {
    const response = await CODELEARNER_API.delete<Response>(
      `/problem-sets/${problem_set_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
