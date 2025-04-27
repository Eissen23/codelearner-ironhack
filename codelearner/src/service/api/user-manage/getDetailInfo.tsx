import axios from "axios";
import { UserDetail } from "../../../types/user.type";
const API_URL = import.meta.env.VITE_API_URL;

interface getUserCredential {
  token: string;
}

export const getDetailInfo = async (
  credentials: getUserCredential
): Promise<UserDetail> => {
  try {
    const response = await axios.get<UserDetail>(
      `${API_URL}/info-detail`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${credentials.token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
