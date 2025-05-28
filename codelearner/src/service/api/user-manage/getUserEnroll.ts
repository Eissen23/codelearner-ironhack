import { CODELEARNER_API } from "../clients/codelearner";
import { Course } from "../../../types/org/course.type";

export const getUserEnroll = async (token: string): Promise<Course[]> => {
  try {
    const response = await CODELEARNER_API.get<Course[]>("/member/enrolled", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error fetching member/enrolled");
    throw error;
  }
};
