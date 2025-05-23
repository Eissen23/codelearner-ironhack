import { CODELEARNER_API } from "../clients/codelearner";
type Response = {
  message: string;
};

export const publishUS = async (
  user_solution_id: string,
  token: string,
  published: boolean = true
): Promise<Response> => {
  const uri = published
    ? `solutions/publish/${user_solution_id}`
    : `solutions/reject/${user_solution_id}`;
  try {
    const response = await CODELEARNER_API.put<Response>(uri, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(`published`, error);
    throw error;
  }
};
