import { CourseResponse } from "../../../types/org/course.type";
import { CODELEARNER_API } from "../clients/codelearner";

export const getCourseInOrg = async (
  org_id: string
): Promise<CourseResponse> => {
  try {
    const response = await CODELEARNER_API.get(
      `/orgs/${org_id}/courses-in-org`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};
