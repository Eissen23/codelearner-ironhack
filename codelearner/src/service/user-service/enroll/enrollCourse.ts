import { CODELEARNER_API } from "../../api/clients/codelearner";
import { Enrolled } from "../../../types/user.type";

type response = {
  message: string;
  user_courses: Enrolled;
};

export const enrollCourse = async (
  course_id: string,
  token: string
): Promise<response> => {
  try {
    const response = await CODELEARNER_API.post<response>(
      `courses/${course_id}/enroll`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("enrollCourse", error);
    throw error;
  }
};
