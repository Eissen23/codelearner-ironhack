import { CODELEARNER_API } from "../clients/codelearner";
import { Course, CourseFormData } from "../../../types/org/course.type";
import { createFormData } from "../../../utils/createFormData";

type Response = {
  course: Course;
};

export const addCourse = async (
  token: string | null,
  course: CourseFormData
): Promise<Response> => {
  const course_formData = createFormData(course);

  try {
    const response = await CODELEARNER_API.post<Response>(
      `/orgs/${course.org_id}/add-course`,
      course_formData,
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
