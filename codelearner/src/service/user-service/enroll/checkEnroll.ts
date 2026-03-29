import { CODELEARNER_API } from "../../api/clients/codelearner";

type Response = {
  enrolled: boolean;
};

export const checkEnroll = async (
  course_id: string,
  token: string
): Promise<Response> => {
  try {
    const response = await CODELEARNER_API.get<Response>(
      `courses/${course_id}/is-study`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("checkEnroll", error);
    throw error;
  }
};
