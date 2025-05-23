import { CODELEARNER_API } from "../clients/codelearner";

type response = {
  message: string;
};

export const deletUsrSolution = async (
  user_solution_id: string,
  token: string
): Promise<response> => {
  try {
    const response = await CODELEARNER_API.delete<response>(
      `solutions/your-solution/${user_solution_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("deletUsrSolution", error);
    throw error;
  }
};
