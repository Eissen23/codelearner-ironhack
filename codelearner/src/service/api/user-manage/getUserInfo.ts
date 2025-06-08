import { UserDetail } from "../../../types/user.type";
import { CODELEARNER_API } from "../clients/codelearner";
import axios from "axios";

interface getUserCredential {
  token: string;
  signal?: AbortSignal;
}

export const getUserInfo = async (
  credentials: getUserCredential
): Promise<UserDetail> => {
  try {
    const response = await CODELEARNER_API.get<UserDetail>(`/user`, {
      headers: {
        Authorization: `Bearer ${credentials.token}`,
      },
      signal: credentials.signal,
    });

    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
    } else {
      console.error("Error fetching data:", error);
    }
    throw error;
  }
};
