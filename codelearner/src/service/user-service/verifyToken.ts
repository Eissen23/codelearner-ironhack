import { CODELEARNER_API } from "../api/clients/codelearner";

type response = {
  message: string;
  status: number;
};

export const verifyToken = async (token: string) => {
  try {
    const response = await CODELEARNER_API.post<response>(
      "/verify-token",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: () => true,
      }
    );
    return response;
  } catch (error) {
    console.log("verifyToken", error);
    throw error;
  }
};
