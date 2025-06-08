import { LoginResponse } from "../../types/auth.types";
import { CODELEARNER_API } from "../api/clients/codelearner";

interface LoginCredentials {
  email: string;
  password: string;
}

export const loginService = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response = await CODELEARNER_API.post<LoginResponse>(`login`, {
      email: credentials.email,
      password: credentials.password,
    });

    return response.data;
  } catch (error) {
    // console.error("Error fetching data:", error);
    throw error;
  }
};
