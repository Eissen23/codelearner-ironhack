import { CODELEARNER_API } from "../../api/clients/codelearner";

type Response = {
  message: string;
};

export const cancelCourses = async (
  courseId: string,
  token: string
): Promise<Response> => {
  try {
    const response = await CODELEARNER_API.delete<Response>(
      `courses/${courseId}/unenroll`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("cancelCourses", error);
    throw error;
  }
};
