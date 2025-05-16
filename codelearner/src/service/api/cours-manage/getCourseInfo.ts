import { CourseInfoResponse } from "../../../types/org/course.type";
import { CODELEARNER_API } from "../clients/codelearner";

export async function getCourseInfo(
  course_id: string,
  is_belong?: boolean | false
): Promise<CourseInfoResponse> {
  try {
    const response = await CODELEARNER_API.get(
      `/courses/${course_id}?is_belong=${is_belong}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch course info: ${error}`);
  }
}
