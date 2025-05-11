import { CODELEARNER_API } from "../clients/codelearner";
import { Course } from "../../../types/org/course.type";

export const getCourseHead = async (token: string): Promise<Course[]> => {
  try {
    const response = await CODELEARNER_API.get<Course[]>(
      "/member/modrated-course",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error fetching member/your-orgs");
    throw error;
  }
};
