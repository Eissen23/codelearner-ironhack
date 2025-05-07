import { CourseInfoResponse } from "../../../types/org/course.type";
import { CODELEARNER_API } from "../clients/codelearner";

export async function getCourseInfo(
  course_id: string
): Promise<CourseInfoResponse> {
  try {
    const response = await CODELEARNER_API.get(`/courses/${course_id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch course info: ${error}`);
  }
}
