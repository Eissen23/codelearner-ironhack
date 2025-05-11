import { CODELEARNER_API } from "../clients/codelearner";
import { Course } from "../../../types/org/course.type";

export const addCourse = async (
  token: string | null,
  course: Omit<Course, "id" | "created_at">
): Promise<Course> => {
  try {
    const response = await CODELEARNER_API.post<Course>(
      `/orgs/${course.org_id}/add-course`,
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
