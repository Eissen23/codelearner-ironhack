import { RegisterResponse } from "../../types/auth.types";
import { CODELEARNER_API } from "../api/clients/codelearner";
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
  try {
    const response = await CODELEARNER_API.post<RegisterResponse>(`register`, {
      account_name: credentials.account_name,
      full_name: credentials.full_name,
      email: credentials.email,
      password: credentials.password,
      password_confirmation: credentials.password_confirmation,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
