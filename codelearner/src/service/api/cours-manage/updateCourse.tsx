import { CODELEARNER_API } from "../clients/codelearner";
import { Course } from "../../../types/org/course.type";

type Response = {
  course: Course;
  message: string;
};

export const updateCourse = async (
  token: string | null,
  course: Omit<Course, "created_at">
): Promise<Response> => {
  try {
    const response = await CODELEARNER_API.put<Response>(
      `/courses/${course.id}`,
      course,
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
