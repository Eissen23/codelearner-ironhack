import { UserDetail } from "../../../types/user.type";
import { CODELEARNER_API } from "../clients/codelearner";

interface getUserCredential {
  token: string;
}

// TODO: rewrite this function to use CODELEARNER_API
export const getDetailInfo = async (
  credentials: getUserCredential
): Promise<UserDetail> => {
  try {
    const response = await CODELEARNER_API.get<UserDetail>(`/info-detail`, {
      headers: {
        Authorization: `Bearer ${credentials.token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
