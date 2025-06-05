import { LogoutResponse } from "../../types/auth.types";
import { CODELEARNER_API } from "../api/clients/codelearner";

interface LogoutCredentials {
  token: string;
}

export const logoutService = async (
  credentials: LogoutCredentials
): Promise<LogoutResponse> => {
  try {
    const response = await CODELEARNER_API.delete(`logout`, {
      headers: {
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
