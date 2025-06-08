import { User } from "../../../types/auth.types";
import { UpdateImgCred } from "../../../types/feature-data/image.type";
import { createFormData } from "../../../utils/createFormData";
import { CODELEARNER_API } from "../../api/clients/codelearner";

type Response = {
  message: string;
  data: User;
};

export const imageAvatar = async (cred: UpdateImgCred): Promise<Response> => {
  const img = createFormData({ image_avatar: cred.asset_img, _method: "PUT" });

  try {
    const response = await CODELEARNER_API.post<Response>("user/update", img, {
      headers: {
        Authorization: `Bearer ${cred.user_token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log("imageAvatar", error);
    throw error;
  }
};
