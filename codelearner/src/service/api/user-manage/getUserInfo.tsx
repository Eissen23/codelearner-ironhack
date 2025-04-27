import axios from "axios";
import { User } from "../../../types/auth.types";
const API_URL = import.meta.env.VITE_API_URL;

interface getUserCredential {
  token: string;
}

export const getUserInfo = async (
  credentials: getUserCredential
): Promise<User> => {
  try {
    const response = await axios.get<User>(
      `${API_URL}/user`,
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
