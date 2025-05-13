import { CourseResponse } from "../../../types/org/course.type";
import { CODELEARNER_API } from "../clients/codelearner";

export const getCourseList = async (
  page?: string,
  per_page?: string,
  keyword?: string,
  sort?: string
): Promise<CourseResponse> => {
  try {
    const response = await CODELEARNER_API.get("/courses", {
      params: {
        page: page || undefined,
        per_page: per_page || undefined,
        keyword: keyword || undefined,
        sort: sort || undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};
