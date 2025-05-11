import { UserDetail } from "../../../types/user.type";
import { CODELEARNER_API } from "../clients/codelearner";

// TODO: rewrite this function to use CODELEARNER_API
export const getDetailInfo = async (token: string): Promise<UserDetail> => {
  try {
    const response = await CODELEARNER_API.get<UserDetail>(`/info-detail`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
