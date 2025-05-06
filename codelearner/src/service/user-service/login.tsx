import axios from "axios";
import { LoginResponse } from "../../types/auth.types";
const API_URL = import.meta.env.VITE_API_URL;

interface LoginCredentials {
  email: string;
  password: string;
}

export const loginService = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${API_URL}/login`,
      {
        email: credentials.email,
        password: credentials.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
