import { User } from "../../types/auth.types";
import { CODELEARNER_API } from "../api/clients/codelearner";

type Response = {
  message: string;
  data: User;
};

export const updateInfo = async (
  userInfo: Omit<
    User,
    "id" | "created_at" | "updated_at" | "email_verified_at"
  >,
  token: string
): Promise<Response> => {
  try {
    const response = await CODELEARNER_API.put<Response>(
      "user/update",
      userInfo,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("updateInfo", error);
    throw error;
  }
};
