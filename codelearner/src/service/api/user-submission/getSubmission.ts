import { CODELEARNER_API } from "../clients/codelearner";
import { ResultData } from "../../../types/code/judge0.type";

type Response = {
  submission: ResultData;
};

export const getUserSubmission = async (
  token: string,
  submission_id: string
): Promise<Response> => {
  try {
    const response = await CODELEARNER_API.get<Response>(
      `submissions/${submission_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Fail to fetch submission", error);
    throw error;
  }
};
