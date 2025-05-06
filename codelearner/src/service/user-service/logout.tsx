import axios from "axios";
import { LogoutResponse } from "../../types/auth.types";
const API_URL = import.meta.env.VITE_API_URL;

interface LogoutCredentials {
  token: string;
}

export const logoutService = async (
  credentials: LogoutCredentials
): Promise<LogoutResponse> => {
  try {
    const response = await axios.delete(`${API_URL}/logout`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.token}`,
      },
    });
    console.log(response.data);
    return {
      message: response.data.message,
      status: response.status,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
