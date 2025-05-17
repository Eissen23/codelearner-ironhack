import { CODELEARNER_API } from "../api/clients/codelearner";

export const isOwnerCourse = async (token: string, course_id: string) => {
  try {
    const response = await CODELEARNER_API.get<boolean>(
      `/problemset/${course_id}/is-own`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
