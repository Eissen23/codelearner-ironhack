import { CourseResponse } from "../../../types/org/course.type";
import { CODELEARNER_API } from "../clients/codelearner";

export const getCourseList = async (id: number): Promise<CourseResponse> => {
  try {
    const response = await CODELEARNER_API.get(`/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};
