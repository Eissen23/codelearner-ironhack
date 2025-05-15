import { Course } from "../../../../types/org/course.type";
import { CODELEARNER_API } from "../../clients/codelearner";

export const getCoursesMod = async (token: string): Promise<Course[]> => {
  try {
    const response = await CODELEARNER_API.get<Course[]>(`/mod/your-courses`, {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error getCoursesMod", error);
    throw error;
  }
};
