import axios from "axios";
import { RegisterResponse } from "../../types/feature-data/auth.types";
const API_URL = import.meta.env.VITE_API_URL;

interface RegisterCredentials {
  account_name: string;
  full_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const registerService = async (
  credentials: RegisterCredentials
): Promise<RegisterResponse> => {
  console.log(credentials);
  try {
    const response = await axios.post<RegisterResponse>(
      `${API_URL}/register`,
      {
        account_name: credentials.account_name,
        full_name: credentials.full_name,
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.password_confirmation,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
