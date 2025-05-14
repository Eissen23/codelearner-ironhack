import { CODELEARNER_API } from "../clients/codelearner";

export const deleteCourse = async (
  course_id: string,
  token: string
): Promise<{ message: string }> => {
  try {
    const response = await CODELEARNER_API.delete(`/courses/${course_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error deleting course", error);
    throw error;
  }
};
