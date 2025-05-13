import { CourseResponse } from "../../../types/org/course.type";
import { CODELEARNER_API } from "../clients/codelearner";

export const getCourses = async (
  orgId?: string,
  page?: string,
  perPage?: string,
  keyword?: string,
  sort?: string
): Promise<CourseResponse> => {
  try {
    const url = orgId ? `/orgs/${orgId}/courses-in-org` : "/courses";

    const response = await CODELEARNER_API.get<CourseResponse>(url, {
      params: {
        page: page || undefined,
        per_page: perPage || undefined,
        keyword: keyword || undefined,
        sort: sort || undefined,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching courses data:", error);
    throw error;
  }
};
